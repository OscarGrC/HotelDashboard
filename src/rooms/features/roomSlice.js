import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomsListThunk, addRoomThunk, editRoomThunk, deleteRoomThunk, fetchRoomByIdThunk, } from "./roomThunks.js";

export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        roomsData: [],
        selectedRoom: null,
        fetchStatus: "idle",
        addStatus: "idle",
        editStatus: "idle",
        deleteStatus: "idle",
        fetchByIdStatus: "idle",
        error: null,
    },
    reducers: {
        setSelectedRoom(state, action) {
            state.selectedRoom = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomsListThunk.pending, (state) => {
                state.fetchStatus = "pending";
            })
            .addCase(fetchRoomsListThunk.fulfilled, (state, action) => {
                state.fetchStatus = "fulfilled";
                state.roomsData = action.payload;
            })
            .addCase(fetchRoomsListThunk.rejected, (state, action) => {
                state.fetchStatus = "rejected";
                state.error = action.error.message;
            })
            .addCase(fetchRoomByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchRoomByIdThunk.fulfilled, (state, action) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedRoom = action.payload;
            })
            .addCase(fetchRoomByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = "rejected";
                state.error = action.error.message;
            })
            .addCase(addRoomThunk.pending, (state) => {
                state.addStatus = "pending";
            })
            .addCase(addRoomThunk.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.roomsData.push(action.payload);
            })
            .addCase(addRoomThunk.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(editRoomThunk.pending, (state) => {
                state.editStatus = "pending";
            })
            .addCase(editRoomThunk.fulfilled, (state, action) => {
                state.editStatus = "fulfilled";
                const index = state.roomsData.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.roomsData[index] = action.payload;
                }
            })
            .addCase(editRoomThunk.rejected, (state, action) => {
                state.editStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(deleteRoomThunk.pending, (state) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteRoomThunk.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.roomsData = state.roomsData.filter((room) => room.id !== action.payload.id);
            })
            .addCase(deleteRoomThunk.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.error = action.error.message;
            });
    },
});

export const { setSelectedRoom } = roomSlice.actions;

export const getRoomsData = (state) => state.rooms.roomsData;
export const getFetchStatus = (state) => state.rooms.fetchStatus;
export const getAddStatus = (state) => state.rooms.addStatus;
export const getEditStatus = (state) => state.rooms.editStatus;
export const getDeleteStatus = (state) => state.rooms.deleteStatus;
export const getRoomError = (state) => state.rooms.error;
export const getSelectedRoom = (state) => state.rooms.selectedRoom;
export const getFetchByIdStatus = (state) => state.rooms.fetchByIdStatus;
