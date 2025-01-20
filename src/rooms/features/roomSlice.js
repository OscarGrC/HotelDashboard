import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomsListThunk } from "./roomThunks.js";

export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        roomsData: [],
        selectedRoom: null,
        status: "idle",
        error: false,
    },
    reducers: {
        setSelectedRoom(state, action) {
            state.selectedRoom = action.payload;
        },
        clearSelectedRoom(state) {
            state.selectedRoom = null;
        },
        addRoom(state, action) {
            state.roomsData.push(action.payload);
        },
        editRoom(state, action) {
            const index = state.roomsData.findIndex((room) => room.id === action.payload.id);
            if (index !== -1) {
                state.roomsData[index] = action.payload;
            }
        },
        deleteRoom(state, action) {
            state.roomsData = state.roomsData.filter((room) => room.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomsListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchRoomsListThunk.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.roomsData = action.payload;
            })
            .addCase(fetchRoomsListThunk.rejected, (state) => {
                state.error = true;
                state.status = "rejected";
            });
    },
});

export const {
    setSelectedRoom,
    clearSelectedRoom,
    addRoom,
    editRoom,
    deleteRoom,
} = roomSlice.actions;

export const getRoomsData = (state) => state.rooms.roomsData;
export const getRoomStatus = (state) => state.rooms.status;
export const getRoomError = (state) => state.rooms.error;
export const getSelectedRoom = (state) => state.rooms.selectedRoom;




