import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingData from "../data/booking.json";
import { BookingApiInterface } from "../interfaces/BookingApiInterface";
const API_BASE_URL = import.meta.env.VITE_API_BASE;
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbGx5LmNoYW1wbGluQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkS1kyMDJ6cVN3L0xRWDhXWkpRc3lzZS9pMUl2VlBhWWw3aHZ0VENOY001SjJEdE13Tzg3OS4iLCJpYXQiOjE3NDA0NzM5NjksImV4cCI6MTc0MTA3ODc2OX0._OlVSqpY7SGjn_F7f3BArE2kpyGsdBi8ksmw68JX-Rw";

export const fetchBookingListThunk = createAsyncThunk<BookingApiInterface[]>(
    "booking/fetchBookingList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch bookings");
        }
    }
);

export const addBookingThunk = createAsyncThunk<BookingApiInterface, BookingApiInterface>(
    "booking/addBooking",
    async (newBooking, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(newBooking),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add booking");
        }
    }
);

export const editBookingThunk = createAsyncThunk<BookingApiInterface, BookingApiInterface>(
    "booking/editBooking",
    async (updatedBooking, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings/${updatedBooking._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(updatedBooking),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit booking");
        }
    }
);

export const deleteBookingThunk = createAsyncThunk<string, string>(
    "booking/deleteBooking",
    async (bookingId, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return bookingId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete booking");
        }
    }
);

export const fetchBookingByIdThunk = createAsyncThunk<BookingApiInterface, number>(
    "booking/fetchBookingById",
    async (bookingId, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const booking = await response.json();
            if (!booking) {
                return thunkAPI.rejectWithValue("Booking not found");
            }
            return booking;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch booking by ID");
        }
    }
);
