import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactApi } from "../interfaces/ContactApi";
import { getAuthToken } from "../../login/features/getAuthToken";
import { handleAuthError } from "../../login/features/handleAuthError";


const API_BASE_URL = import.meta.env.VITE_API_BASE;
const Token = getAuthToken()
export const fetchContactArchivedListThunk = createAsyncThunk<ContactApi[]>(
    "contact/archived/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/archived`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data: ContactApi[] = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch Archived contact");
        }
    }
);

