import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingData from "../data/booking.json";
import { BookingApiInterface } from "../interfaces/BookingApiInterface";

const simulateFetch = <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchBookingListThunk = createAsyncThunk<BookingApiInterface[]>(
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

export const addBookingThunk = createAsyncThunk<BookingApiInterface, BookingApiInterface>(
    "booking/addBooking",
    async (newBooking: BookingApiInterface, thunkAPI) => {
        try {
            const data = await simulateFetch(newBooking);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add booking");
        }
    }
);

export const editBookingThunk = createAsyncThunk<BookingApiInterface, BookingApiInterface>(
    "booking/editBooking",
    async (updatedBooking: BookingApiInterface, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedBooking);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit booking");
        }
    }
);

export const deleteBookingThunk = createAsyncThunk<number, number>(
    "booking/deleteBooking",
    async (bookingId: number, thunkAPI) => {
        try {
            const data = await simulateFetch(bookingId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete booking");
        }
    }
);
export const fetchBookingByIdThunk = createAsyncThunk<BookingApiInterface, number, { rejectValue: string }>(
    "booking/fetchBookingById",
    async (bookingId: number, thunkAPI) => {
        try {
            const data = await simulateFetch(bookingData);
            const booking = data.find((b) => b.guest.id === bookingId);
            if (!booking) {
                return thunkAPI.rejectWithValue("Booking not found");
            }
            return booking;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch booking by ID");
        }
    }
);
