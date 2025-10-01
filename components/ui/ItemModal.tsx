
import React, { useState, useEffect } from 'react';
import { Item, ItemType, ParsedItemData } from '../../types';
import { XIcon, SparklesIcon } from '../icons/Icons';
import { parseItemDescription } from '../../services/geminiService';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item | null;
    itemType: ItemType;
    onSave: (item: Omit<Item, 'id'> | Item) => void;
}

type ModalTab = 'manual' | 'smart';

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, item, itemType, onSave }) => {
    const [formData, setFormData] = useState<Omit<Item, 'id'>>({
        item: '', location: '', date: new Date().toISOString().split('T')[0], status: 'Pending', specification: ''
    });
    const [smartDescription, setSmartDescription] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [parseError, setParseError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ModalTab>('manual');

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({ item: '', location: '', date: new Date().toISOString().split('T')[0], status: 'Pending', specification: '' });
        }
    }, [item, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(item ? { ...formData, id: item.id } : formData);
        onClose();
    };

    const handleParseDescription = async () => {
        if (!smartDescription) return;
        setIsParsing(true);
        setParseError(null);
        try {
            const parsedData: ParsedItemData = await parseItemDescription(smartDescription);
            setFormData(prev => ({
                ...prev,
                item: parsedData.item || '',
                location: parsedData.location || '',
                date: parsedData.date || new Date().toISOString().split('T')[0],
                specification: parsedData.specification || '',
            }));
            setActiveTab('manual');
        } catch (error: any) {
            setParseError(error.message);
        } finally {
            setIsParsing(false);
        }
    };
    
    if (!isOpen) return null;
    
    const TabButton: React.FC<{ tab: ModalTab, children: React.ReactNode }> = ({ tab, children }) => (
        <button
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab
              ? 'bg-primary-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {children}
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-semibold">{item ? 'Edit' : 'Add'} {itemType} Item</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-5">
                    <div className="flex justify-center space-x-2 mb-5 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <TabButton tab="manual">Manual Entry</TabButton>
                        <TabButton tab="smart">
                          <span className="flex items-center gap-2">
                            <SparklesIcon className="w-4 h-4"/> Smart Entry (AI)
                          </span>
                        </TabButton>
                    </div>

                    {activeTab === 'smart' && (
                        <div className="space-y-4">
                           <p className="text-sm text-gray-500 dark:text-gray-400">Describe the item in plain English, and our AI will fill out the form for you.</p>
                           <textarea
                                name="smart-description"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="e.g., I lost my silver Dell XPS laptop with a cat sticker near Amriteshwari Hall yesterday."
                                value={smartDescription}
                                onChange={(e) => setSmartDescription(e.target.value)}
                            />
                            {parseError && <p className="text-sm text-red-500">{parseError}</p>}
                             <button
                                type="button"
                                onClick={handleParseDescription}
                                disabled={isParsing || !smartDescription}
                                className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-colors"
                            >
                                {isParsing ? 'Analyzing...' : 'Parse Description'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'manual' && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name</label>
                                    <input type="text" name="item" value={formData.item} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                        <option>Pending</option>
                                        <option>Claimed</option>
                                        <option>Archived</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specification</label>
                                <textarea name="specification" rows={3} value={formData.specification} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g., color, brand, distinguishing marks..."></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">{item ? 'Save Changes' : 'Add Item'}</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemModal;
