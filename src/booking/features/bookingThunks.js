import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingData from "../../booking/data/booking.json";

export const fetchBookingListThunk = createAsyncThunk(
    "users/fetchBookingList",
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
