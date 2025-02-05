import { createAsyncThunk } from "@reduxjs/toolkit";
import contactData from "../data/contact.json";
import archivedData from "../data/contactArchived.json";
import { ContactApi } from "../interfaces/ContactApi";

const simulateFetch = <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchContactListThunk = createAsyncThunk<ContactApi[]>(
    "contacts/fetchContactList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(contactData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);

export const fetchContactArchivedListThunk = createAsyncThunk<ContactApi[]>(
    "contacts/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(archivedData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);
export const archiveContactThunk = createAsyncThunk<ContactApi, ContactApi>(
    "contacts/archiveContact",
    async (contact: ContactApi, thunkAPI) => {
        try {
            const archivedContact = await simulateFetch(contact);
            return archivedContact;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to archive contact");
        }
    }
);
export const fetchContactByIdThunk = createAsyncThunk<ContactApi, number>(
    "contacts/fetchContactById",
    async (contactId: number, thunkAPI) => {
        try {
            const data = await simulateFetch(contactData);
            const contact = data.find((c) => c.id === contactId);
            if (!contact) {
                return thunkAPI.rejectWithValue("Contact not found");
            }
            return contact;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact by ID");
        }
    }
);