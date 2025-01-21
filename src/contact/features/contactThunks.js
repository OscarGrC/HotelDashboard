import { createAsyncThunk } from "@reduxjs/toolkit";
import contactData from "../../contact/data/contact.json";

export const fetchContactListThunk = createAsyncThunk(
    "users/fetchContactList",
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
