
import React, { useState, useMemo } from 'react';
import { mockLostItems } from '../../data/mockData';
import { mockFoundItems } from '../../data/mockData';
import { Item } from '../../types';
import { SearchIcon } from '../icons/Icons';

const HandoverDetails: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const claimedItems = useMemo(() => {
        const allClaimed = [...mockLostItems, ...mockFoundItems].filter(item => item.status === 'Claimed');
        return allClaimed;
    }, []);

    const filteredItems = useMemo(() => {
        return claimedItems.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.owner?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.owner?.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.handover?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [claimedItems, searchTerm]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Claimed & Handovered Items</h2>
                <div className="relative w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search handovers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Owner Details</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Handovered By</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredItems.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={item.itemPicture || `https://picsum.photos/seed/${item.id}/100/100`} alt={item.item} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{item.item}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{item.specification}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                   <div className="font-medium text-gray-800 dark:text-gray-200">{item.owner?.name || 'N/A'}</div>
                                   <div>{item.owner?.registerNumber || 'N/A'}</div>
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                   <div className="font-medium text-gray-800 dark:text-gray-200">{item.handover?.name || 'N/A'}</div>
                                   <div>{item.handover?.faculty} ({item.handover?.dept})</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredItems.length === 0 && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No handover records found.
                    </div>
                 )}
            </div>
        </div>
    );
};

export default HandoverDetails;
