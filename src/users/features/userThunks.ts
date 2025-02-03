import { createAsyncThunk } from "@reduxjs/toolkit";
import usersData from "../../users/data/users.json";

const simulateFetch = (data) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });


export const fetchUsersListThunk = createAsyncThunk(
    "users/fetchUsersList",
    async (_, thunkAPI) => {
        try {
            const data = await simulateFetch(usersData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch users");
        }
    }
);

export const addUserThunk = createAsyncThunk(
    "users/addUser",
    async (newUser, thunkAPI) => {
        try {
            const data = await simulateFetch(newUser);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add user");
        }
    }
);

export const editUserThunk = createAsyncThunk(
    "users/editUser",
    async (updatedUser, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedUser);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit user");
        }
    }
);

export const deleteUserThunk = createAsyncThunk(
    "users/deleteUser",
    async (userId, thunkAPI) => {
        try {
            const data = await simulateFetch(userId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete user");
        }
    }
);
export const fetchUserByIdThunk = createAsyncThunk(
    "users/fetchUserById",
    async (userId, thunkAPI) => {
        try {
            const data = await simulateFetch(usersData);
            const user = data.find((u) => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user by ID");
        }
    }
);