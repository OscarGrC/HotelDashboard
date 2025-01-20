import { createAsyncThunk } from "@reduxjs/toolkit";
import usersData from "../../users/data/users.json";

export const fetchUsersListThunk = createAsyncThunk(
    "users/fetchUsersList",
    async (_, thunkAPI) => {
        try {
            const simulateFetch = () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(usersData);
                    }, 200);
                });

            const data = await simulateFetch();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch users");
        }
    }
);
