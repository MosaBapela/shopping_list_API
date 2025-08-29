import {Item} from '../types/item';

//Creating an item array where we will be storing our items
let items : Item[] = [];

//Declaring a counter variable that will assign a unique ID to each and every item
let currentId = 1;

//Creating a function to get all the items
export const getItems = () : Item[] => {
    return items;
};

//Creating a function to get a single item
export const getItemById = (id : number) : Item | undefined => {
    const item = items.find((item) => item.id === id)
    return item
}

//Creating a function to add an item
export const addItem = (name : string, quantity : number,purchasedStatus : boolean) : Item => {
    const newItem : Item = {id:currentId++, name, quantity, purchasedStatus}
    items.push(newItem)
    return newItem
}

//Creating a function to update an item
export const updateItem = (id: number, name: string, quantity: number, purchasedStatus: boolean): Item | undefined => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        return undefined;
    }
    
    items[itemIndex] = {
        ...items[itemIndex],
        name,
        quantity,
        purchasedStatus
    };
    
    return items[itemIndex];
}

//Creating a function to delete an item
export const deleteItem = (id: number): boolean => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
        return false;
    }
    
    items.splice(itemIndex, 1);
    return true;
}


