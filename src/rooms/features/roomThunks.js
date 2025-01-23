import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../../rooms/data/rooms.json";

const simulateFetch = (data) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchRoomsListThunk = createAsyncThunk(
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

export const addRoomThunk = createAsyncThunk(
    "rooms/addRoom",
    async (newRoom, thunkAPI) => {
        try {
            const data = await simulateFetch(newRoom);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add room");
        }
    }
);

export const editRoomThunk = createAsyncThunk(
    "rooms/editRoom",
    async (updatedRoom, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedRoom);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit room");
        }
    }
);

export const deleteRoomThunk = createAsyncThunk(
    "rooms/deleteRoom",
    async (roomId, thunkAPI) => {
        try {
            const data = await simulateFetch(roomId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete room");
        }
    }
);
export const fetchRoomByIdThunk = createAsyncThunk(
    "rooms/fetchRoomById",
    async (roomId, thunkAPI) => {
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