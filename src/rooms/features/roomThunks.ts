import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../data/rooms.json";
import { RoomApi } from "../interfaces/RoomApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbGx5LmNoYW1wbGluQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkS1kyMDJ6cVN3L0xRWDhXWkpRc3lzZS9pMUl2VlBhWWw3aHZ0VENOY001SjJEdE13Tzg3OS4iLCJpYXQiOjE3NDA0NzM5NjksImV4cCI6MTc0MTA3ODc2OX0._OlVSqpY7SGjn_F7f3BArE2kpyGsdBi8ksmw68JX-Rw";

export const fetchRoomsListThunk = createAsyncThunk<RoomApi[]>(
    "rooms/fetchRoomsList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rooms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch rooms");
        }
    }
);

export const addRoomThunk = createAsyncThunk<RoomApi, RoomApi>(
    "rooms/addRoom",
    async (newRoom, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rooms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(newRoom),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add room");
        }
    }
);

export const editRoomThunk = createAsyncThunk<RoomApi, RoomApi>(
    "rooms/editRoom",
    async (updatedRoom, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rooms/${updatedRoom._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(updatedRoom),
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit room");
        }
    }
);

export const deleteRoomThunk = createAsyncThunk<string, string>(
    "rooms/deleteRoom",
    async (roomId, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return roomId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete room");
        }
    }
);

export const fetchRoomByIdThunk = createAsyncThunk<RoomApi, string>(
    "rooms/fetchRoomById",
    async (roomId, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch room by ID");
        }
    }
);
