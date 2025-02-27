import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../data/rooms.json";
import { RoomApi } from "../interfaces/RoomApi";
import { getAuthToken } from "../../login/features/getAuthToken";
import { handleAuthError } from "../../login/features/handleAuthError";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
export const fetchRoomsListThunk = createAsyncThunk<RoomApi[]>(
    "rooms/fetchRoomsList",
    async (_, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/rooms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
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
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/rooms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(newRoom),
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
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
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/rooms/${updatedRoom._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(updatedRoom),
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
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
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
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
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch room by ID");
        }
    }
);
