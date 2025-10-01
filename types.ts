
export type ItemStatus = 'Pending' | 'Claimed' | 'Archived';
export type ItemType = 'Lost' | 'Found';

export interface OwnerDetails {
    registerNumber: string;
    year: string;
    dept: string;
    name: string;
}

export interface HandoverDetails {
    name: string;
    faculty: string;
    dept: string;
    cabinNo: string;
}

export interface Item {
    id: number;
    item: string;
    location: string;
    date: string;
    status: ItemStatus;
    itemPicture?: string;
    specification?: string;
    owner?: OwnerDetails;
    handover?: HandoverDetails;
}

export interface LostItem extends Item {}
export interface FoundItem extends Item {}

export interface ParsedItemData {
    item: string;
    location: string;
    date: string; // YYYY-MM-DD
    specification: string;
}
