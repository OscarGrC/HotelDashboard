import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersListThunk, addUserThunk, editUserThunk, deleteUserThunk, fetchUserByIdThunk, } from "./userThunks.js";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        usersData: [],
        selectedUser: null,
        fetchStatus: "idle",
        addStatus: "idle",
        editStatus: "idle",
        deleteStatus: "idle",
        fetchByIdStatus: "idle",
        error: null,
    },
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersListThunk.pending, (state) => {
                state.fetchStatus = "pending";
            })
            .addCase(fetchUsersListThunk.fulfilled, (state, action) => {
                state.fetchStatus = "fulfilled";
                state.usersData = action.payload;
            })
            .addCase(fetchUsersListThunk.rejected, (state, action) => {
                state.fetchStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(fetchUserByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(addUserThunk.pending, (state) => {
                state.addStatus = "pending";
            })
            .addCase(addUserThunk.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.usersData.push(action.payload);
            })
            .addCase(addUserThunk.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(editUserThunk.pending, (state) => {
                state.editStatus = "pending";
            })
            .addCase(editUserThunk.fulfilled, (state, action) => {
                state.editStatus = "fulfilled";
                const index = state.usersData.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.usersData[index] = action.payload;
                }
            })
            .addCase(editUserThunk.rejected, (state, action) => {
                state.editStatus = "rejected";
                state.error = action.error.message;
            })

            .addCase(deleteUserThunk.pending, (state) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.usersData = state.usersData.filter((user) => user.id !== action.payload.id);
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.error = action.error.message;
            });
    },
});

export const { setSelectedUser } = userSlice.actions;

export const getUsersData = (state) => state.users.usersData;
export const getFetchStatus = (state) => state.users.fetchStatus;
export const getAddStatus = (state) => state.users.addStatus;
export const getEditStatus = (state) => state.users.editStatus;
export const getDeleteStatus = (state) => state.users.deleteStatus;
export const getUserError = (state) => state.users.error;
export const getSelectedUser = (state) => state.users.selectedUser;
export const getFetchByIdStatus = (state) => state.users.fetchByIdStatus;
