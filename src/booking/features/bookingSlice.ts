import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBookingListThunk, addBookingThunk, editBookingThunk, deleteBookingThunk, fetchBookingByIdThunk, } from "./bookingThunks.js";
import { BookingState } from '../interfaces/BookingState.ts'
import { BookingApiInterface } from "../interfaces/BookingApiInterface.ts";
import { RootState } from "../../app/store.ts";

const initialState: BookingState = {
    bookingData: [],
    selectedBooking: null,
    fetchStatus: "idle",
    addStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    fetchByIdStatus: "idle",
    error: "Default Error",
};

export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setSelectedBooking(state, action: PayloadAction<BookingApiInterface>) {
            state.selectedBooking = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingListThunk.pending, (state) => {
                state.fetchStatus = "pending";
            })
            .addCase(fetchBookingListThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface[]>) => {
                state.fetchStatus = "fulfilled";
                state.bookingData = action.payload;
            })
            .addCase(fetchBookingListThunk.rejected, (state) => {
                state.fetchStatus = "rejected";
                state.error = "Failed to fetch bookings";
            })

            .addCase(fetchBookingByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchBookingByIdThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedBooking = action.payload;
            })
            .addCase(fetchBookingByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = "rejected";
                state.error = action.payload || "Failed to fetch booking by ID";
            })

            .addCase(addBookingThunk.pending, (state) => {
                state.addStatus = "pending";
            })
            .addCase(addBookingThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.addStatus = "fulfilled";
                state.bookingData.push(action.payload);
            })
            .addCase(addBookingThunk.rejected, (state) => {
                state.addStatus = "rejected";
                state.error = "Failed to add booking";
            })

            .addCase(editBookingThunk.pending, (state) => {
                state.editStatus = "pending";
            })
            .addCase(editBookingThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.editStatus = "fulfilled";
                const index = state.bookingData.findIndex(
                    (booking) => booking.guest.id === action.payload.guest.id
                );
                if (index !== -1) {
                    state.bookingData[index] = action.payload;
                }
            })
            .addCase(editBookingThunk.rejected, (state) => {
                state.editStatus = "rejected";
                state.error = "Failed to edit booking";
            })

            .addCase(deleteBookingThunk.pending, (state) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteBookingThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = "fulfilled";
                state.bookingData = state.bookingData.filter(
                    (booking) => booking.guest.id !== action.payload
                );
            })
            .addCase(deleteBookingThunk.rejected, (state) => {
                state.deleteStatus = "rejected";
                state.error = "Failed to delete booking";
            });
    },
});


export const { setSelectedBooking } = bookingSlice.actions;

export const getBookingData = (state: RootState) => state.bookings.bookingData;
export const getFetchStatus = (state: RootState) => state.bookings.fetchStatus;
export const getAddStatus = (state: RootState) => state.bookings.addStatus;
export const getEditStatus = (state: RootState) => state.bookings.editStatus;
export const getDeleteStatus = (state: RootState) => state.bookings.deleteStatus;
export const getBookingError = (state: RootState) => state.bookings.error;
export const getSelectedBooking = (state: RootState) => state.bookings.selectedBooking;
export const getFetchByIdStatus = (state: RootState) => state.bookings.fetchByIdStatus;


