
import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [smtpServer, setSmtpServer] = useState('');
    const [smtpPort, setSmtpPort] = useState('587');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [isTesting, setIsTesting] = useState(false);

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // In a real app, you would make an API call to save these settings securely.
        console.log({
            notificationsEnabled,
            email,
            password: '[REDACTED]',
            smtpServer,
            smtpPort,
        });
        
        setMessage({ text: "Email settings saved successfully! (This is a demo)", type: 'success' });
        setTimeout(() => setMessage(null), 5000);
    };
    
    const handleSendTest = async () => {
        setMessage(null);
        if (!email || !password || !smtpServer || !smtpPort) {
            setMessage({ text: "Please fill in all email fields before sending a test.", type: 'error' });
            return;
        }
        setIsTesting(true);
        
        // Simulate API call to send a test email
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsTesting(false);
        // Simulate a successful response
        setMessage({ text: `A test email has been sent to ${email}.`, type: 'success' });
        setTimeout(() => setMessage(null), 5000);
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">System Settings</h2>
                
                <form onSubmit={handleSaveSettings} className="space-y-8">
                    {/* Email Notification Section */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Email Notification Settings</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Configure an SMTP email account to send notifications for events like item matches.
                        </p>
                        
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center">
                                <input
                                    id="notifications-enabled"
                                    name="notifications-enabled"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                    checked={notificationsEnabled}
                                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                                />
                                <label htmlFor="notifications-enabled" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Enable Email Notifications
                                </label>
                            </div>

                            {notificationsEnabled && (
                                <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Sender Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="mt-1 w-full max-w-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email Password / App Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="mt-1 w-full max-w-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            For services like Gmail, you may need to generate an "App Password" from your Google Account security settings.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="smtp-server" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                SMTP Server
                                            </label>
                                            <input
                                                type="text"
                                                name="smtp-server"
                                                id="smtp-server"
                                                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="smtp.example.com"
                                                value={smtpServer}
                                                onChange={(e) => setSmtpServer(e.target.value)}
                                            />
                                        </div>
                                         <div>
                                            <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                SMTP Port
                                            </label>
                                            <input
                                                type="text"
                                                name="smtp-port"
                                                id="smtp-port"
                                                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="587"
                                                value={smtpPort}
                                                onChange={(e) => setSmtpPort(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                       <button
                                            type="button"
                                            onClick={handleSendTest}
                                            disabled={isTesting}
                                            className="px-4 py-2 border border-primary-500 text-primary-500 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isTesting ? 'Sending...' : 'Send Test Email'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-5 border-t border-gray-200 dark:border-gray-700">
                         <div className="flex-grow">
                            {message && (
                                <p className={`text-sm ${message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {message.text}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
