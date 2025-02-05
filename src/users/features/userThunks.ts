import { createAsyncThunk } from "@reduxjs/toolkit";
import usersData from "../data/users.json";
import { IUserApi } from "../interfaces/IUserApi";

const simulateFetch = <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });

export const fetchUsersListThunk = createAsyncThunk<IUserApi[]>(
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

export const addUserThunk = createAsyncThunk<IUserApi, Partial<IUserApi>>(
    "users/addUser",
    async (newUser: Partial<IUserApi>, thunkAPI) => {
        try {
            const newId = usersData.length > 0 ? Math.max(...usersData.map(user => user.id)) + 1 : 1;
            const userWithId: IUserApi = {
                id: newId,
                photo: newUser.photo || "",
                fullName: newUser.fullName || "",
                email: newUser.email || "",
                startDate: newUser.startDate || "",
                description: newUser.description || "",
                puesto: newUser.puesto || "",
                stade: newUser.stade ?? false,
                password: newUser.password || "",
                phone: newUser.phone || ""
            };
            const data = await simulateFetch(userWithId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add user");
        }
    }
);

export const editUserThunk = createAsyncThunk<IUserApi, IUserApi>(
    "users/editUser",
    async (updatedUser: IUserApi, thunkAPI) => {
        try {
            const data = await simulateFetch(updatedUser);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to edit user");
        }
    }
);

export const deleteUserThunk = createAsyncThunk<number, number>(
    "users/deleteUser",
    async (userId: number, thunkAPI) => {
        try {
            const data = await simulateFetch(userId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete user");
        }
    }
);
export const fetchUserByIdThunk = createAsyncThunk<IUserApi, number>(
    "users/fetchUserById",
    async (userId: number, thunkAPI) => {
        try {
            const data: IUserApi[] = await simulateFetch(usersData);
            const user: IUserApi | undefined = data.find((u) => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user by ID");
        }
    }
);
