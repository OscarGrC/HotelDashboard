import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../rooms/features/roomSlice";
import { userSlice } from "../users/features/userSlice";

export const store = configureStore({
    reducer: {
        rooms: roomSlice.reducer,
        users: userSlice.reducer,

    }
})