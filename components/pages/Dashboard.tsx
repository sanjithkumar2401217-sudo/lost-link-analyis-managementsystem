
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockLostItems, mockFoundItems } from '../../data/mockData';
import { LostItem, FoundItem } from '../../types';
import { AlertTriangleIcon, SearchIcon, CheckSquareIcon, HomeIcon } from '../icons/Icons';

const Dashboard: React.FC = () => {
    const [lostItems] = useState<LostItem[]>(mockLostItems);
    const [foundItems] = useState<FoundItem[]>(mockFoundItems);
    const [potentialMatches, setPotentialMatches] = useState<[LostItem, FoundItem][]>([]);

    useEffect(() => {
        const findMatches = () => {
            const matches: [LostItem, FoundItem][] = [];
            const pendingLost = lostItems.filter(item => item.status === 'Pending');
            const pendingFound = foundItems.filter(item => item.status === 'Pending');

            pendingLost.forEach(lost => {
                pendingFound.forEach(found => {
                    if (lost.item.toLowerCase().includes(found.item.toLowerCase()) || found.item.toLowerCase().includes(lost.item.toLowerCase())) {
                        if (lost.location === found.location) {
                             matches.push([lost, found]);
                        }
                    }
                });
            });
            setPotentialMatches(matches);
        };
        findMatches();
    }, [lostItems, foundItems]);

    const totalLost = lostItems.length;
    const totalFound = foundItems.length;
    const totalClaimed = [...lostItems, ...foundItems].filter(item => item.status === 'Claimed').length;
    const totalPending = [...lostItems, ...foundItems].filter(item => item.status === 'Pending').length;

    const chartData = [
        { name: 'Jan', lost: 4, found: 3 }, { name: 'Feb', lost: 2, found: 5 },
        { name: 'Mar', lost: 7, found: 4 }, { name: 'Apr', lost: 5, found: 6 },
        { name: 'May', lost: 8, found: 7 }, { name: 'Jun', lost: 6, found: 9 },
    ];
    
    const statusData = [
      { name: 'Pending', value: totalPending },
      { name: 'Claimed', value: totalClaimed },
    ];
    const COLORS = ['#FF8042', '#00C49F'];


    return (
        <div>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Lost Items</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalLost}</p>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                       <SearchIcon className="w-6 h-6 text-red-500" />
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Found Items</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalFound}</p>
                    </div>
                     <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                       <CheckSquareIcon className="w-6 h-6 text-green-500" />
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Items Claimed</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalClaimed}</p>
                    </div>
                     <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                       <HomeIcon className="w-6 h-6 text-blue-500" />
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Items</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{totalPending}</p>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full">
                        <AlertTriangleIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Monthly Activity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }} />
                            <YAxis tick={{ fill: 'rgb(156 163 175)' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                            <Legend />
                            <Bar dataKey="lost" fill="#ef4444" name="Lost" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="found" fill="#22c55e" name="Found" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                     <h3 className="text-xl font-semibold mb-4">Item Status Overview</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} />
                        </PieChart>
                      </ResponsiveContainer>
                </div>
            </div>

            {potentialMatches.length > 0 && (
                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-orange-500 flex items-center">
                        <AlertTriangleIcon className="w-6 h-6 mr-2" />
                        Potential Matches Detected
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lost Item</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Found Item</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dates</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {potentialMatches.map(([lost, found], index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">{lost.item}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{found.item}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{lost.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{`Lost: ${lost.date}, Found: ${found.date}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
