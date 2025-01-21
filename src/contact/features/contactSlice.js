import { createSlice } from "@reduxjs/toolkit";
import { fetchContactListThunk } from "./contactThunks.js";
import { fetchContactArchivedListThunk } from "./contactArchivedThunks.js";

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        contactData: [],
        contactArchivedData: [],
        status: "idle",
        statusArchived: "idle",
        error: false,
        errorArchived: false,
    },
    reducers: {
        archived(state, action) {
            state.contactArchivedData.push(action.payload);
            state.contactData = state.contactData.filter((contact) => contact.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchContactListThunk.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.contactData = action.payload;
            })
            .addCase(fetchContactListThunk.rejected, (state) => {
                state.error = true;
                state.status = "rejected";
            })
            .addCase(fetchContactArchivedListThunk.pending, (state) => {
                state.statusArchived = "pending";
            })
            .addCase(fetchContactArchivedListThunk.fulfilled, (state, action) => {
                state.statusArchived = "fulfilled";
                state.contactArchivedData = action.payload;
            })
            .addCase(fetchContactArchivedListThunk.rejected, (state) => {
                state.error = true;
                state.statusArchived = "rejected";
            });
    },
});

export const {
    archived,
} = contactSlice.actions;

export const getContactsData = (state) => state.contacts.contactData;
export const getContactsStatus = (state) => state.contacts.status;
export const getContactsError = (state) => state.contacts.error;
export const getContactsArchivedStatus = (state) => state.contacts.statusArchived;
export const getContactsArchivedError = (state) => state.contacts.errorArchived;
