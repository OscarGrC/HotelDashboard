import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRoomsListThunk, addRoomThunk, editRoomThunk, deleteRoomThunk, fetchRoomByIdThunk, } from "./roomThunks.js";
import { RoomApi } from "../interfaces/RoomApi.js";
import { RoomState } from "../interfaces/RoomState.js";
import { RootState } from "../../app/store.js";


const initialState: RoomState = {
    roomsData: [],
    selectedRoom: null,
    fetchStatus: "idle",
    addStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    fetchByIdStatus: "idle",
    error: "Default error",

}

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
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
            .addCase(fetchRoomsListThunk.fulfilled, (state, action: PayloadAction<RoomApi[]>) => {
                state.fetchStatus = "fulfilled";
                state.roomsData = action.payload;
            })
            .addCase(fetchRoomsListThunk.rejected, (state) => {
                state.fetchStatus = "rejected";
                state.error = "Error to load Room list";
            })
            .addCase(fetchRoomByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchRoomByIdThunk.fulfilled, (state, action: PayloadAction<RoomApi>) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedRoom = action.payload;
            })
            .addCase(fetchRoomByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = "rejected";
                state.error = "Error to load room by Id";
            })
            .addCase(addRoomThunk.pending, (state) => {
                state.addStatus = "pending";
            })
            .addCase(addRoomThunk.fulfilled, (state, action: PayloadAction<RoomApi>) => {
                state.addStatus = "fulfilled";
                state.roomsData.push(action.payload);
            })
            .addCase(addRoomThunk.rejected, (state) => {
                state.addStatus = "rejected";
                state.error = "Error to add new Room";
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
            .addCase(editRoomThunk.rejected, (state) => {
                state.editStatus = "rejected";
                state.error = "Error to edit Room";
            })

            .addCase(deleteRoomThunk.pending, (state) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = "fulfilled";
                state.roomsData = state.roomsData.filter((room) => room.id !== action.payload);
            })
            .addCase(deleteRoomThunk.rejected, (state) => {
                state.deleteStatus = "rejected";
                state.error = "Error to Delete Room";
            });
    },
});

export const { setSelectedRoom } = roomSlice.actions;

export const getRoomsData = (state: RootState) => state.rooms.roomsData;
export const getFetchStatus = (state: RootState) => state.rooms.fetchStatus;
export const getAddStatus = (state: RootState) => state.rooms.addStatus;
export const getEditStatus = (state: RootState) => state.rooms.editStatus;
export const getDeleteStatus = (state: RootState) => state.rooms.deleteStatus;
export const getRoomError = (state: RootState) => state.rooms.error;
export const getSelectedRoom = (state: RootState) => state.rooms.selectedRoom;
export const getFetchByIdStatus = (state: RootState) => state.rooms.fetchByIdStatus;
