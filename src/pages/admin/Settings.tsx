import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { useTheme } from '../../context/ThemeContext';
import { Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
    const { siteSettings, updateSiteSettings } = useAdmin();
    const { theme } = useTheme();

    const [settings, setSettings] = useState({
        siteName: siteSettings.siteName,
        primaryColor: siteSettings.primaryColor,
        secondaryColor: siteSettings.secondaryColor,
        logo: siteSettings.logo
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSiteSettings(settings);
        // In a real app, this would make an API call
        console.log('Updating settings:', settings);
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Settings</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Configure your website settings</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">General Settings</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        id="siteName"
                                        name="siteName"
                                        value={settings.siteName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Logo URL
                                    </label>
                                    <input
                                        type="text"
                                        id="logo"
                                        name="logo"
                                        value={settings.logo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Settings</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Primary Color
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="color"
                                            id="primaryColor"
                                            name="primaryColor"
                                            value={settings.primaryColor}
                                            onChange={handleChange}
                                            className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded"
                                        />
                                        <input
                                            type="text"
                                            value={settings.primaryColor}
                                            onChange={handleChange}
                                            name="primaryColor"
                                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Secondary Color
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="color"
                                            id="secondaryColor"
                                            name="secondaryColor"
                                            value={settings.secondaryColor}
                                            onChange={handleChange}
                                            className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded"
                                        />
                                        <input
                                            type="text"
                                            value={settings.secondaryColor}
                                            onChange={handleChange}
                                            name="secondaryColor"
                                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>

                            <div className={`p-6 border border-gray-200 dark:border-gray-700 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                                }`}>
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        style={{ backgroundColor: settings.primaryColor }}
                                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Primary Button
                                    </button>

                                    <button
                                        type="button"
                                        style={{ backgroundColor: settings.secondaryColor }}
                                        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        Secondary Button
                                    </button>

                                    <div>
                                        <h3 style={{ color: settings.primaryColor }} className="text-xl font-semibold">
                                            {settings.siteName}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Sample text with theme colors
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;