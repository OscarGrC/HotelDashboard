import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersListThunk, addUserThunk, editUserThunk, deleteUserThunk, fetchUserByIdThunk, } from "./userThunks.js";
import { IUserApi } from "../interfaces/IUserApi.js";
import { UserState } from "../interfaces/IUserState.js";
import { RootState } from "../../app/store.js";
import { StatusEnum } from "../../common/interfaces/statusEnum.js";

const initialState: UserState = {
    usersData: [],
    selectedUser: null,
    fetchStatus: StatusEnum.IDLE,
    addStatus: StatusEnum.IDLE,
    editStatus: StatusEnum.IDLE,
    deleteStatus: StatusEnum.IDLE,
    fetchByIdStatus: StatusEnum.IDLE,
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
                state.fetchStatus = StatusEnum.PENDING;
            })
            .addCase(fetchUsersListThunk.fulfilled, (state, action: PayloadAction<IUserApi[]>) => {
                state.fetchStatus = StatusEnum.FULFILLED;
                state.usersData = action.payload;
            })
            .addCase(fetchUsersListThunk.rejected, (state, action) => {
                state.fetchStatus = StatusEnum.REJECTED;
                state.error = action.error.message;
            })

            .addCase(fetchUserByIdThunk.pending, (state) => {
                state.fetchByIdStatus = StatusEnum.PENDING;
            })
            .addCase(fetchUserByIdThunk.fulfilled, (state, action: PayloadAction<IUserApi>) => {
                state.fetchByIdStatus = StatusEnum.FULFILLED;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = StatusEnum.REJECTED;
                state.error = action.error.message;
            })

            .addCase(addUserThunk.pending, (state) => {
                state.addStatus = StatusEnum.PENDING;
            })
            .addCase(addUserThunk.fulfilled, (state, action: PayloadAction<IUserApi>) => {
                state.addStatus = StatusEnum.FULFILLED;
                state.usersData.push(action.payload);
            })
            .addCase(addUserThunk.rejected, (state, action) => {
                state.addStatus = StatusEnum.REJECTED;
                state.error = action.error.message;
            })

            .addCase(editUserThunk.pending, (state) => {
                state.editStatus = StatusEnum.PENDING
            })
            .addCase(editUserThunk.fulfilled, (state, action) => {
                state.editStatus = StatusEnum.FULFILLED;
                const index = state.usersData.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.usersData[index] = action.payload;
                }
            })
            .addCase(editUserThunk.rejected, (state, action) => {
                state.editStatus = StatusEnum.REJECTED
                state.error = action.error.message;
            })

            .addCase(deleteUserThunk.pending, (state) => {
                state.deleteStatus = StatusEnum.PENDING
            })
            .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleteStatus = StatusEnum.FULFILLED;
                state.usersData = state.usersData.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.deleteStatus = StatusEnum.REJECTED;
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
