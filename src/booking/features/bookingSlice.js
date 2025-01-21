import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingListThunk } from "./bookingThunks.js";

export const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookingData: [],
        selectedBooking: null,
        status: "idle",
        error: false,
    },
    reducers: {
        setSelectedBooking(state, action) {
            state.selectedBooking = action.payload;
        },
        clearSelectedBooking(state) {
            state.selectedBooking = null;
        },
        addBooking(state, action) {
            state.bookingData.push(action.payload);
        },
        editBooking(state, action) {
            const index = state.bookingData.findIndex((booking) => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookingData[index] = action.payload;
            }
        },
        deleteBooking(state, action) {
            state.bookingData = state.bookingData.filter((booking) => booking.guest.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchBookingListThunk.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.bookingData = action.payload;
            })
            .addCase(fetchBookingListThunk.rejected, (state) => {
                state.error = true;
                state.status = "rejected";
            });
    },
});

export const {
    setSelectedBooking,
    clearSelectedBooking,
    addBooking,
    editBooking,
    deleteBooking,
} = bookingSlice.actions;

export const getBookingData = (state) => state.booking.bookingData;
export const getBookingStatus = (state) => state.booking.status;
export const getBookingError = (state) => state.booking.error;
export const getSelectedBooking = (state) => state.booking.selectedBooking;