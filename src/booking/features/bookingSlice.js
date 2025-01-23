import { createSlice } from "@reduxjs/toolkit";
import { fetchBookingListThunk, addBookingThunk, editBookingThunk, deleteBookingThunk, fetchBookingByIdThunk, } from "./bookingThunks.js";

export const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookingData: [],
        selectedBooking: null,
        fetchStatus: "idle",
        fetchByIdStatus: "idle",
        addStatus: "idle",
        editStatus: "idle",
        deleteStatus: "idle",
        error: null,
    },
    reducers: {
        setSelectedBooking(state, action) {
            state.selectedBooking = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingListThunk.pending, (state) => {
                state.fetchStatus = "pending";
            })
            .addCase(fetchBookingListThunk.fulfilled, (state, action) => {
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
            .addCase(fetchBookingByIdThunk.fulfilled, (state, action) => {
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
            .addCase(addBookingThunk.fulfilled, (state, action) => {
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
            .addCase(editBookingThunk.fulfilled, (state, action) => {
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
            .addCase(deleteBookingThunk.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.bookingData = state.bookingData.filter(
                    (booking) => booking.guest.id !== action.payload.guest.id
                );
            })
            .addCase(deleteBookingThunk.rejected, (state) => {
                state.deleteStatus = "rejected";
                state.error = "Failed to delete booking";
            });
    },
});


export const { setSelectedBooking, clearSelectedBooking } = bookingSlice.actions;

export const getBookingData = (state) => state.booking.bookingData;
export const getFetchStatus = (state) => state.booking.fetchStatus;
export const getAddStatus = (state) => state.booking.addStatus;
export const getEditStatus = (state) => state.booking.editStatus;
export const getDeleteStatus = (state) => state.booking.deleteStatus;
export const getBookingError = (state) => state.booking.error;
export const getSelectedBooking = (state) => state.booking.selectedBooking;
export const getFetchByIdStatus = (state) => state.booking.fetchByIdStatus;


