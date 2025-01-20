import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "../rooms/features/roomSlice";


export const store = configureStore({
    reducer: {
        rooms: roomSlice.reducer

    }
})