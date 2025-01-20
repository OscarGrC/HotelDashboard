import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsData from "../../rooms/data/rooms.json";

export const fetchRoomsListThunk = createAsyncThunk(
    "rooms/fetchRoomsList",
    async (_, thunkAPI) => {
        try {
            const simulateFetch = () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(roomsData);
                    }, 200);
                });

            const data = await simulateFetch();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch rooms");
        }
    }
);
