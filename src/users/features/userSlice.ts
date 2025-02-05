import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersListThunk, addUserThunk, editUserThunk, deleteUserThunk, fetchUserByIdThunk, } from "./userThunks.js";
import { IUserApi } from "../interfaces/IUserApi.js";
import { UserState } from "../interfaces/IUserState.js";
import { RootState } from "../../app/store.js";

const initialState: UserState = {
    usersData: [],
    selectedUser: null,
    fetchStatus: "idle",
    addStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle",
    fetchByIdStatus: "idle",
    error: "Default Error",
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSelectedUser(state, action: PayloadAction<IUserApi>) {
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersListThunk.pending, (state) => {
                state.fetchStatus = "pending";
            })
            .addCase(fetchUsersListThunk.fulfilled, (state, action: PayloadAction<IUserApi[]>) => {
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
            .addCase(fetchUserByIdThunk.fulfilled, (state, action: PayloadAction<IUserApi>) => {
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
            .addCase(addUserThunk.fulfilled, (state, action: PayloadAction<IUserApi>) => {
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
            .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = "fulfilled";
                state.usersData = state.usersData.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.error = action.error.message;
            });
    },
});

export const { setSelectedUser } = userSlice.actions;

export const getUsersData = (state: RootState) => state.users.usersData;
export const getFetchStatus = (state: RootState) => state.users.fetchStatus;
export const getAddStatus = (state: RootState) => state.users.addStatus;
export const getEditStatus = (state: RootState) => state.users.editStatus;
export const getDeleteStatus = (state: RootState) => state.users.deleteStatus;
export const getUserError = (state: RootState) => state.users.error;
export const getSelectedUser = (state: RootState) => state.users.selectedUser;
export const getFetchByIdStatus = (state: RootState) => state.users.fetchByIdStatus;
