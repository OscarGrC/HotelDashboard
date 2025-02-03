import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../rooms/features/roomSlice";
import { userSlice } from "../users/features/userSlice";
import { bookingSlice } from "../booking/features/bookingSlice"
import { contactSlice } from "../contact/features/contactSlice";

export const store = configureStore({
    reducer: {
        rooms: roomSlice.reducer,
        users: userSlice.reducer,
        bookings: bookingSlice.reducer,
        contacts: contactSlice.reducer,
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']