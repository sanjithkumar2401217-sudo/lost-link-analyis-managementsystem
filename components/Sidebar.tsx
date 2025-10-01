
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, SearchIcon, CheckSquareIcon, BarChartIcon, HelpCircleIcon, UserCheckIcon, SettingsIcon } from './icons/Icons';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-2.5 text-base font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-gray-800'
        }`;

    return (
        <aside className={`relative bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
             <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
                <HelpCircleIcon className="h-8 w-8 text-primary-500" />
                {isOpen && <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">LostLink</h1>}
            </div>
            <nav className="mt-6 px-4 space-y-2">
                <NavLink to="/dashboard" className={navLinkClasses}>
                    <HomeIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">Dashboard</span>}
                </NavLink>
                <NavLink to="/lost-items" className={navLinkClasses}>
                    <SearchIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">Lost Items</span>}
                </NavLink>
                <NavLink to="/found-items" className={navLinkClasses}>
                    <CheckSquareIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">Found Items</span>}
                </NavLink>
                <NavLink to="/handover-details" className={navLinkClasses}>
                    <UserCheckIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">Handover Details</span>}
                </NavLink>
                <NavLink to="/settings" className={navLinkClasses}>
                    <SettingsIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">System Settings</span>}
                </NavLink>
                <NavLink to="/reports" className={navLinkClasses}>
                    <BarChartIcon className="w-6 h-6" />
                    {isOpen && <span className="ml-4">Reports</span>}
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;