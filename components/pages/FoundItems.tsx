
import React, { useState, useMemo } from 'react';
import { mockFoundItems } from '../../data/mockData';
import { FoundItem } from '../../types';
import ItemTable from '../ui/ItemTable';

const FoundItems: React.FC = () => {
    const [items, setItems] = useState<FoundItem[]>(mockFoundItems);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const handleAddItem = (item: Omit<FoundItem, 'id'>) => {
        const newItem: FoundItem = { ...item, id: Date.now() };
        setItems(prev => [newItem, ...prev]);
    };

    const handleUpdateItem = (updatedItem: FoundItem) => {
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const handleDeleteItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <ItemTable
            title="Found Items"
            items={filteredItems}
            itemType="Found"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
        />
    );
};

export default FoundItems;
