
import React, { useState, useMemo } from 'react';
import { mockLostItems } from '../../data/mockData';
import { LostItem } from '../../types';
import ItemTable from '../ui/ItemTable';

const LostItems: React.FC = () => {
    const [items, setItems] = useState<LostItem[]>(mockLostItems);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    const handleAddItem = (item: Omit<LostItem, 'id'>) => {
        const newItem: LostItem = { ...item, id: Date.now() };
        setItems(prev => [newItem, ...prev]);
    };

    const handleUpdateItem = (updatedItem: LostItem) => {
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const handleDeleteItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <ItemTable
            title="Lost Items"
            items={filteredItems}
            itemType="Lost"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
        />
    );
};

export default LostItems;
