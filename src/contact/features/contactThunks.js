import { createAsyncThunk } from "@reduxjs/toolkit";
import contactData from "../../contact/data/contact.json";
import archivedData from "../../contact/data/contactArchived.json";

const simulateFetch = (data) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchContactListThunk = createAsyncThunk(
    "users/fetchContactList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(contactData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);

export const fetchContactArchivedListThunk = createAsyncThunk(
    "users/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(archivedData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);
export const archiveContactThunk = createAsyncThunk(
    "users/archiveContact",
    async (contact, thunkAPI) => {
        try {
            const archivedContact = await simulateFetch(contact);
            return archivedContact;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to archive contact");
        }
    }
);
export const fetchContactByIdThunk = createAsyncThunk(
    "contacts/fetchContactById",
    async (contactId, thunkAPI) => {
        try {
            const data = await simulateFetch(contactData);
            const contact = data.find((c) => c.id === contactId);
            if (!contact) {
                throw new Error("Contact not found");
            }
            return contact;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch contact by ID");
        }
    }
);