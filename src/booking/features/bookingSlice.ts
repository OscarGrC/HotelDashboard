import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBookingListThunk, addBookingThunk, editBookingThunk, deleteBookingThunk, fetchBookingByIdThunk, } from "./bookingThunks.js";
import { BookingState } from '../interfaces/BookingState.ts'
import { BookingApiInterface } from "../interfaces/BookingApiInterface.ts";
import { RootState } from "../../app/store.ts";
import { StatusEnum } from "../../common/interfaces/statusEnum.ts";

const initialState: BookingState = {
    bookingData: [],
    selectedBooking: null,
    fetchStatus: StatusEnum.IDLE,
    addStatus: StatusEnum.IDLE,
    editStatus: StatusEnum.IDLE,
    deleteStatus: StatusEnum.IDLE,
    fetchByIdStatus: StatusEnum.IDLE,
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
                state.fetchStatus = StatusEnum.PENDING;
            })
            .addCase(fetchBookingListThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface[]>) => {
                state.fetchStatus = StatusEnum.FULFILLED;
                state.bookingData = action.payload;
            })
            .addCase(fetchBookingListThunk.rejected, (state) => {
                state.fetchStatus = StatusEnum.REJECTED;
                state.error = "Failed to fetch bookings";
            })

            .addCase(fetchBookingByIdThunk.pending, (state) => {
                state.fetchByIdStatus = StatusEnum.PENDING;
            })
            .addCase(fetchBookingByIdThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.fetchByIdStatus = StatusEnum.FULFILLED;
                state.selectedBooking = action.payload;
            })
            .addCase(fetchBookingByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = StatusEnum.REJECTED;
                state.error = action.payload || "Failed to fetch booking by ID";
            })

            .addCase(addBookingThunk.pending, (state) => {
                state.addStatus = StatusEnum.PENDING;
            })
            .addCase(addBookingThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.addStatus = StatusEnum.FULFILLED;
                const newId = state.bookingData.length > 0
                    ? Math.max(...state.bookingData.map(booking => booking.guest.id)) + 1
                    : 1;

                const newBooking = {
                    ...action.payload,
                    guest: {
                        ...action.payload.guest,
                        id: newId
                    }
                };
                state.bookingData.push(newBooking);
            })
            .addCase(addBookingThunk.rejected, (state) => {
                state.addStatus = StatusEnum.REJECTED;
                state.error = "Failed to add booking";
            })

            .addCase(editBookingThunk.pending, (state) => {
                state.editStatus = StatusEnum.PENDING;
            })
            .addCase(editBookingThunk.fulfilled, (state, action: PayloadAction<BookingApiInterface>) => {
                state.editStatus = StatusEnum.FULFILLED;
                const index = state.bookingData.findIndex(
                    (booking) => booking.guest.id === action.payload.guest.id
                );
                if (index !== -1) {
                    state.bookingData[index] = action.payload;
                }
            })
            .addCase(editBookingThunk.rejected, (state) => {
                state.editStatus = StatusEnum.REJECTED;
                state.error = "Failed to edit booking";
            })

            .addCase(deleteBookingThunk.pending, (state) => {
                state.deleteStatus = StatusEnum.PENDING;
            })
            .addCase(deleteBookingThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = StatusEnum.FULFILLED;
                state.bookingData = state.bookingData.filter(
                    (booking) => booking.guest.id !== action.payload
                );
            })
            .addCase(deleteBookingThunk.rejected, (state) => {
                state.deleteStatus = StatusEnum.REJECTED;
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


