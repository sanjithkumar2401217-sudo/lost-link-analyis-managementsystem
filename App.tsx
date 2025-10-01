
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import LostItems from './components/pages/LostItems';
import FoundItems from './components/pages/FoundItems';
import Reports from './components/pages/Reports';
import Login from './components/pages/Login';
import HandoverDetails from './components/pages/HandoverDetails';
import Settings from './components/pages/Settings';

const MainLayout: React.FC<{ userEmail: string; onLogout: () => void }> = ({ userEmail, onLogout }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const getTitle = () => {
        const path = location.pathname.split('/')[1];
        switch (path) {
            case 'dashboard': return 'Dashboard';
            case 'lost-items': return 'Lost Items Management';
            case 'found-items': return 'Found Items Management';
            case 'reports': return 'Analytics & Reports';
            case 'handover-details': return 'Handover Details';
            case 'settings': return 'System Settings';
            default: return 'LostLink System';
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    title={getTitle()}
                    sidebarOpen={isSidebarOpen} 
                    setSidebarOpen={setSidebarOpen}
                    userEmail={userEmail}
                    onLogout={onLogout}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/lost-items" element={<LostItems />} />
                            <Route path="/found-items" element={<FoundItems />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/handover-details" element={<HandoverDetails />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);

    const handleLogin = (email: string) => {
        setUser({ email });
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <ThemeProvider>
            <HashRouter>
                <Routes>
                    <Route 
                        path="/login" 
                        element={
                            !user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />
                        } 
                    />
                    <Route 
                        path="/*"
                        element={
                            user ? <MainLayout userEmail={user.email} onLogout={handleLogout} /> : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
};

export default App;
