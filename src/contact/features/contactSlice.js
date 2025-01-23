import { createSlice } from "@reduxjs/toolkit";
import { fetchContactListThunk, fetchContactByIdThunk } from "./contactThunks.js";
import { fetchContactArchivedListThunk } from "./contactArchivedThunks.js";
import { archiveContactThunk } from "./contactThunks.js";

export const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        contactData: [],
        contactArchivedData: [],
        selectedContact: null,
        status: "idle",
        statusArchived: "idle",
        archiveStatus: "idle",
        fetchByIdStatus: "idle",
        error: false,
    },
    reducers: {},
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
            .addCase(fetchContactByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchContactByIdThunk.fulfilled, (state, action) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedContact = action.payload;
            })
            .addCase(fetchContactByIdThunk.rejected, (state, action) => {
                state.fetchByIdStatus = "rejected";
                state.error = action.payload || "Failed to fetch contact by ID";
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
            })

            .addCase(archiveContactThunk.pending, (state) => {
                state.archiveStatus = "pending";
            })
            .addCase(archiveContactThunk.fulfilled, (state, action) => {
                state.archiveStatus = "fulfilled";
                state.contactArchivedData.push(action.payload);
                state.contactData = state.contactData.filter((contact) => contact.id !== action.payload.id);
            })
            .addCase(archiveContactThunk.rejected, (state, action) => {
                state.archiveStatus = "rejected";
                state.error = "error archived"
            });
    },
});

export const getContactsData = (state) => state.contacts.contactData;
export const getContactsStatus = (state) => state.contacts.status;
export const getContactsError = (state) => state.contacts.error;
export const getContactsArchivedData = (state) => state.contacts.contactArchivedData;
export const getContactsArchivedStatus = (state) => state.contacts.statusArchived;
export const getArchiveStatus = (state) => state.contacts.archiveStatus;
export const getArchiveError = (state) => state.contacts.archiveError;
export const getFetchByIdStatus = (state) => state.contacts.fetchByIdStatus;
export const getSelectedContact = (state) => state.contacts.selectedContact;

