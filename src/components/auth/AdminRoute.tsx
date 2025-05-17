import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin } = useAdmin();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;