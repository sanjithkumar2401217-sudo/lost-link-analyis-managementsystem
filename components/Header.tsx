
import React from 'react';
import ThemeToggle from './ui/ThemeToggle';
import { MenuIcon, XIcon, LogOutIcon } from './icons/Icons';

interface HeaderProps {
    title: string;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userEmail: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, sidebarOpen, setSidebarOpen, userEmail, onLogout }) => {

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b-2 dark:border-gray-700 shadow-md">
            <div className="flex items-center">
                 <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
                    {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                 </button>
                 <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 dark:text-gray-300 focus:outline-none hidden lg:block">
                    {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                 </button>
                <h1 className="relative ml-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">{title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg uppercase">
                        {userEmail.charAt(0)}
                    </div>
                    <span className="text-sm font-medium hidden sm:block text-gray-700 dark:text-gray-300">{userEmail}</span>
                </div>
                <button 
                    onClick={onLogout}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    aria-label="Logout"
                >
                    <LogOutIcon className="w-6 h-6 text-red-500" />
                </button>
            </div>
        </header>
    );
};

export default Header;