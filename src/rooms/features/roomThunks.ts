import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../data/rooms.json";
import { RoomApi } from "../interfaces/RoomApi";

const simulateFetch = <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });

export const fetchRoomsListThunk = createAsyncThunk<RoomApi[]>(
    "rooms/fetchRoomsList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(roomsData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch rooms");
        }
    }
);

export const addRoomThunk = createAsyncThunk<RoomApi, RoomApi>(
    "rooms/addRoom",
    async (newRoom: RoomApi, thunkAPI) => {
        try {
            const data = await simulateFetch(newRoom);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add room");
        }
    }
);

export const editRoomThunk = createAsyncThunk<RoomApi, RoomApi>(
    "rooms/editRoom",
    async (updatedRoom: RoomApi, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedRoom);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit room");
        }
    }
);
export const deleteRoomThunk = createAsyncThunk<number, number>(
    "rooms/deleteRoom",
    async (roomId: number, thunkAPI) => {
        try {
            const data: number = await simulateFetch(roomId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete room");
        }
    }
);

export const fetchRoomByIdThunk = createAsyncThunk<RoomApi, number>(
    "rooms/fetchRoomById",
    async (roomId: number, thunkAPI) => {
        try {
            const data = await simulateFetch(roomsData);
            const room = data.find((r) => r.id === roomId);
            if (!room) {
                throw new Error("Room not found");
            }
            return room;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch room by ID");
        }
    }
);