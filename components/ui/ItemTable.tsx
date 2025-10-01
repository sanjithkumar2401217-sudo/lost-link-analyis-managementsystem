
import React, { useState } from 'react';
import { Item, ItemType, LostItem, FoundItem } from '../../types';
import ItemModal from './ItemModal';
import { SearchIcon } from '../icons/Icons';

type ItemUnion = LostItem | FoundItem;

interface ItemTableProps {
    title: string;
    items: ItemUnion[];
    itemType: ItemType;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onAddItem: (item: Omit<ItemUnion, 'id'>) => void;
    onUpdateItem: (item: ItemUnion) => void;
    onDeleteItem: (id: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ title, items, itemType, searchTerm, setSearchTerm, onAddItem, onUpdateItem, onDeleteItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<ItemUnion | null>(null);

    const openAddModal = () => {
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item: ItemUnion) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };
    
    const StatusBadge: React.FC<{ status: Item['status'] }> = ({ status }) => {
        const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full";
        switch (status) {
            case 'Pending': return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300`}>Pending</span>;
            case 'Claimed': return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}>Claimed</span>;
            case 'Archived': return <span className={`${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>Archived</span>;
            default: return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <button
                    onClick={openAddModal}
                    className="w-full sm:w-auto px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    Add New {itemType} Item
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {items.map(item => (
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openEditModal(item)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                                    <button onClick={() => onDeleteItem(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {items.length === 0 && (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No items found. Try a different search or add a new item.
                    </div>
                 )}
            </div>
            {isModalOpen && (
                <ItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    item={currentItem}
                    itemType={itemType}
                    onSave={(savedItem) => {
                        if (currentItem) {
                            onUpdateItem(savedItem as ItemUnion);
                        } else {
                            onAddItem(savedItem);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default ItemTable;
