
import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockLostItems, mockFoundItems } from '../../data/mockData';
import { Item } from '../../types';

const Reports: React.FC = () => {
    const [lostItems] = useState(mockLostItems);
    const [foundItems] = useState(mockFoundItems);

    const allItems = [...lostItems, ...foundItems];

    const itemsByLocation = allItems.reduce((acc, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const locationChartData = Object.keys(itemsByLocation).map(location => ({
        name: location,
        count: itemsByLocation[location],
    }));

    const itemsByStatus = allItems.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const statusChartData = Object.keys(itemsByStatus).map(status => ({
        name: status,
        value: itemsByStatus[status],
    }));

    const COLORS = {
        'Pending': '#f97316',
        'Claimed': '#10b981',
        'Archived': '#6b7280',
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Type', 'Item', 'Location', 'Date', 'Status', 'Specification'];
        const rows = allItems.map(item => [
            item.id,
            lostItems.some(li => li.id === item.id) ? 'Lost' : 'Found',
            `"${item.item.replace(/"/g, '""')}"`,
            `"${item.location.replace(/"/g, '""')}"`,
            item.date,
            item.status,
            `"${(item.specification || '').replace(/"/g, '""')}"`
        ].join(','));

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "lost_and_found_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Reports & Analytics</h2>
                <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                >
                    Export to CSV
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Items by Location</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={locationChartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128, 128, 128, 0.2)"/>
                            <XAxis type="number" tick={{ fill: 'rgb(156 163 175)' }} />
                            <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'rgb(156 163 175)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                            <Legend />
                            <Bar dataKey="count" name="Number of Items" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Items by Status</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={statusChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#e5e7eb' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Reports;
