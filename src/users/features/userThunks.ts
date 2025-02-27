import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserApi } from "../interfaces/IUserApi";
import { getAuthToken } from "../../login/features/getAuthToken";
import { handleAuthError } from "../../login/features/handleAuthError";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
export const fetchUsersListThunk = createAsyncThunk<IUserApi[], void>(
    "user/fetchUsersList",
    async (_, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 403) {
                    handleAuthError(response)

                } else {

                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }
            const data: IUserApi[] = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch users");
        }
    }
);

export const addUserThunk = createAsyncThunk<IUserApi, Partial<IUserApi>>(
    "user/addUser",
    async (newUser, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to add user");
        }
    }
);

export const editUserThunk = createAsyncThunk<IUserApi, IUserApi>(
    "user/editUser",
    async (updatedUser, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/user/${updatedUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to edit user");
        }
    }
);

export const deleteUserThunk = createAsyncThunk<string, string>(
    "user/deleteUser",
    async (userId, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) {
                handleAuthError(response)
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return userId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to delete user");
        }
    }
);


export const fetchUserByIdThunk = createAsyncThunk<IUserApi, string>(
    "user/fetchRoomById",
    async (userId, thunkAPI) => {
        try {
            const Token = getAuthToken()
            const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
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
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user by ID");
        }
    }
);
