import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface AdminContextType {
    isAdmin: boolean;
    siteSettings: SiteSettings;
    updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

interface SiteSettings {
    siteName: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
}

const defaultSettings: SiteSettings = {
    siteName: 'LiteraryHaven',
    primaryColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    logo: '/logo.svg'
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);

    const isAdmin = user?.email === 'admin@example.com';

    const updateSiteSettings = (settings: Partial<SiteSettings>) => {
        setSiteSettings(prev => ({ ...prev, ...settings }));
    };

    return (
        <AdminContext.Provider value={{ isAdmin, siteSettings, updateSiteSettings }}>
            {children}
        </AdminContext.Provider>
    );
};