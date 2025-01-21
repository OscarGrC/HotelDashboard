import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchBookingListThunk = createAsyncThunk(
    "users/fetchLogin",
    async (_, thunkAPI) => {
        try {
            const simulateFetch = () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(bookingData);
                    }, 200);
                });

            const data = await simulateFetch();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch booking");
        }
    }
);