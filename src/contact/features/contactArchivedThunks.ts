import { createAsyncThunk } from "@reduxjs/toolkit";
import contactData from "../data/contactArchived.json";
import { ContactApi } from "../interfaces/ContactApi";

const simulateFetch = <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchContactArchivedListThunk = createAsyncThunk<ContactApi[]>(
    "contacts/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(contactData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);
