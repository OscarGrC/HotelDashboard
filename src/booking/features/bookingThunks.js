import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingData from "../../booking/data/booking.json";

const simulateFetch = (data) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });


export const fetchBookingListThunk = createAsyncThunk(
    "booking/fetchBookingList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(bookingData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch bookings");
        }
    }
);

export const addBookingThunk = createAsyncThunk(
    "booking/addBooking",
    async (newBooking, thunkAPI) => {
        try {
            const data = await simulateFetch(newBooking);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add booking");
        }
    }
);

export const editBookingThunk = createAsyncThunk(
    "booking/editBooking",
    async (updatedBooking, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedBooking);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit booking");
        }
    }
);

export const deleteBookingThunk = createAsyncThunk(
    "booking/deleteBooking",
    async (bookingId, thunkAPI) => {
        try {
            const data = await simulateFetch(bookingId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete booking");
        }
    }
);
export const fetchBookingByIdThunk = createAsyncThunk(
    "booking/fetchBookingById",
    async (bookingId, thunkAPI) => {
        try {
            const data = await simulateFetch(bookingsData);
            const booking = data.find((b) => b.id === bookingId);
            if (!booking) {
                throw new Error("Booking not found");
            }
            return booking;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch booking by ID");
        }
    }
);
