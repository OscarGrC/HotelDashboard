import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRoomsListThunk, addRoomThunk, editRoomThunk, deleteRoomThunk, fetchRoomByIdThunk, } from "./roomThunks.js";
import { RoomApi } from "../interfaces/RoomApi.js";
import { RoomState } from "../interfaces/RoomState.js";
import { RootState } from "../../app/store.js";
import { StatusEnum } from "../../common/interfaces/statusEnum.js";


const initialState: RoomState = {
    roomsData: [],
    selectedRoom: null,
    fetchStatus: StatusEnum.IDLE,
    addStatus: StatusEnum.IDLE,
    editStatus: StatusEnum.IDLE,
    deleteStatus: StatusEnum.IDLE,
    fetchByIdStatus: StatusEnum.IDLE,
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
                state.fetchStatus = StatusEnum.PENDING
            })
            .addCase(fetchRoomsListThunk.fulfilled, (state, action: PayloadAction<RoomApi[]>) => {
                state.fetchStatus = StatusEnum.FULFILLED;
                state.roomsData = action.payload;
            })
            .addCase(fetchRoomsListThunk.rejected, (state) => {
                state.fetchStatus = StatusEnum.REJECTED;
                state.error = "Error to load Room list";
            })
            .addCase(fetchRoomByIdThunk.pending, (state) => {
                state.fetchByIdStatus = StatusEnum.PENDING;
            })
            .addCase(fetchRoomByIdThunk.fulfilled, (state, action: PayloadAction<RoomApi>) => {
                state.fetchByIdStatus = StatusEnum.FULFILLED;
                state.selectedRoom = action.payload;
            })
            .addCase(fetchRoomByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = StatusEnum.REJECTED;
                state.error = "Error to load room by Id";
            })
            .addCase(addRoomThunk.pending, (state) => {
                state.addStatus = StatusEnum.PENDING;
            })
            .addCase(addRoomThunk.fulfilled, (state, action: PayloadAction<RoomApi>) => {
                state.addStatus = StatusEnum.FULFILLED;
                state.roomsData.push(action.payload);
            })
            .addCase(addRoomThunk.rejected, (state) => {
                state.addStatus = StatusEnum.REJECTED;
                state.error = "Error to add new Room";
            })

            .addCase(editRoomThunk.pending, (state) => {
                state.editStatus = StatusEnum.PENDING;
            })
            .addCase(editRoomThunk.fulfilled, (state, action) => {
                state.editStatus = StatusEnum.FULFILLED;
                const index = state.roomsData.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.roomsData[index] = action.payload;
                }
            })
            .addCase(editRoomThunk.rejected, (state) => {
                state.editStatus = StatusEnum.REJECTED;
                state.error = "Error to edit Room";
            })

            .addCase(deleteRoomThunk.pending, (state) => {
                state.deleteStatus = StatusEnum.PENDING;
            })
            .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = StatusEnum.FULFILLED;
                state.roomsData = state.roomsData.filter((room) => room.id !== action.payload);
            })
            .addCase(deleteRoomThunk.rejected, (state) => {
                state.deleteStatus = StatusEnum.REJECTED;
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
