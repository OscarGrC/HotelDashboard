// thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponseInterface } from "../interfaces/AuthResponseInterface";

const API_BASE_URL = import.meta.env.VITE_API_BASE;

export const loginThunk = createAsyncThunk<AuthResponseInterface, { email: string; password: string }>(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data: AuthResponseInterface = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to login");
        }
    }
);
