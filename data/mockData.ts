
import { LostItem, FoundItem } from '../types';

export const mockLostItems: LostItem[] = [
    {
        id: 1,
        item: 'iPhone 14 Pro',
        location: 'Library',
        date: '2023-10-26',
        status: 'Claimed',
        specification: 'Deep Purple, small crack on the back',
        itemPicture: 'https://picsum.photos/seed/iphone/200/200',
        owner: { registerNumber: 'CB.EN.U4CSE20123', year: '3rd', dept: 'CSE', name: 'John Doe' },
        handover: { name: 'Admin', faculty: 'Librarian', dept: 'Library', cabinNo: 'A-101' }
    },
    {
        id: 2,
        item: 'Dell XPS Laptop',
        location: 'Amriteshwari Hall',
        date: '2023-10-28',
        status: 'Pending',
        specification: 'Silver color, with a sticker of a cat',
        itemPicture: 'https://picsum.photos/seed/laptop/200/200'
    },
    {
        id: 3,
        item: 'Water Bottle',
        location: 'Basketball Court',
        date: '2023-11-01',
        status: 'Pending',
        specification: 'Hydro Flask, black, 32oz',
        itemPicture: 'https://picsum.photos/seed/bottle/200/200'
    },
    {
        id: 4,
        item: 'Keys',
        location: 'Food Court',
        date: '2023-11-02',
        status: 'Archived',
        specification: 'A bunch of 3 keys with a car remote',
        itemPicture: 'https://picsum.photos/seed/keys/200/200'
    },
     {
        id: 5,
        item: 'Airpods Pro',
        location: 'Gym',
        date: '2023-11-05',
        status: 'Pending',
        specification: 'White case with a few scratches',
        itemPicture: 'https://picsum.photos/seed/airpods/200/200'
    },
];

export const mockFoundItems: FoundItem[] = [
    {
        id: 101,
        item: 'Smart Watch',
        location: 'Central Library',
        date: '2023-10-27',
        status: 'Pending',
        specification: 'Apple Watch Series 8, Midnight color',
        itemPicture: 'https://picsum.photos/seed/watch/200/200'
    },
    {
        id: 102,
        item: 'Dell XPS Laptop',
        location: 'Amriteshwari Hall',
        date: '2023-10-29',
        status: 'Pending',
        specification: 'A silver Dell laptop was found on a bench.',
        itemPicture: 'https://picsum.photos/seed/laptop2/200/200'
    },
    {
        id: 103,
        item: 'ID Card',
        location: 'Main Gate',
        date: '2023-11-03',
        status: 'Claimed',
        specification: 'Student ID card for Jane Smith',
        itemPicture: 'https://picsum.photos/seed/idcard/200/200',
        owner: { registerNumber: 'CB.EN.U4CSE20456', year: '2nd', dept: 'EEE', name: 'Jane Smith' },
        handover: { name: 'Security', faculty: 'Security Head', dept: 'Security', cabinNo: 'Gate 1' }
    },
    {
        id: 104,
        item: 'Umbrella',
        location: 'Near Block 3',
        date: '2023-11-04',
        status: 'Pending',
        specification: 'Large black umbrella',
        itemPicture: 'https://picsum.photos/seed/umbrella/200/200'
    }
];
