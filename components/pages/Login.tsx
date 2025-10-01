
import React, { useState } from 'react';
import { LogoIcon } from '../icons/Icons';
import ThemeToggle from '../ui/ThemeToggle';

interface LoginProps {
    onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const hasRegisteredUser = !!localStorage.getItem('lostLinkUser');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const storedUserRaw = localStorage.getItem('lostLinkUser');
        
        if (storedUserRaw) {
            // Existing user, check credentials
            const storedUser = JSON.parse(storedUserRaw);
            if (email === storedUser.email && password === storedUser.password) {
                onLogin(email);
            } else {
                setError('Invalid email or password.');
            }
        } else {
            // No user exists, this is the first login (registration)
            if (email && password) { // Basic validation
                // In a real app, password should be hashed before storing.
                const newUser = { email, password };
                localStorage.setItem('lostLinkUser', JSON.stringify(newUser));
                onLogin(email);
            } else {
                setError('Please provide a valid email and password to register.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="text-center">
                    <div className="flex justify-center mx-auto mb-4">
                        <LogoIcon className="w-16 h-16 text-primary-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LostLink System</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {hasRegisteredUser ? 'Please sign in to continue' : 'Your first login will register you as the admin.'}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-input" className="sr-only">Password</label>
                            <input
                                id="password-input"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <p className="text-sm text-center text-red-500">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary-500"
                        >
                            {hasRegisteredUser ? 'Sign in' : 'Register & Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;