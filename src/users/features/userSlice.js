import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersListThunk } from "./userThunks.js";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        usersData: [],
        selectedUser: null,
        status: "idle",
        error: false,
    },
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
        clearSelectedUser(state) {
            state.selectedUser = null;
        },
        addUser(state, action) {
            state.usersData.push(action.payload);
        },
        editUser(state, action) {
            const index = state.usersData.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.usersData[index] = action.payload;
            }
        },
        deleteUser(state, action) {
            state.usersData = state.usersData.filter((user) => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchUsersListThunk.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.usersData = action.payload;
            })
            .addCase(fetchUsersListThunk.rejected, (state) => {
                state.error = true;
                state.status = "rejected";
            });
    },
});

export const {
    setSelectedUser,
    clearSelectedUser,
    addUser,
    editUser,
    deleteUser,
} = userSlice.actions;

export const getUsersData = (state) => state.users.roomsData;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;
export const getSelectedUser = (state) => state.users.selectedUser;