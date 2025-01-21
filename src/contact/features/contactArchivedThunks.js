import { createAsyncThunk } from "@reduxjs/toolkit";
import contactData from "../../contact/data/contactArchived.json";

export const fetchContactArchivedListThunk = createAsyncThunk(
    "users/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const simulateFetch = () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(contactData);
                    }, 200);
                });

            const data = await simulateFetch();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch contact");
        }
    }
);