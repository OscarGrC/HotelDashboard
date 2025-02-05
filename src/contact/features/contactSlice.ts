import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContactListThunk, fetchContactByIdThunk } from "./contactThunks.ts";
import { fetchContactArchivedListThunk } from "./contactArchivedThunks.ts";
import { archiveContactThunk } from "./contactThunks.ts";
import { ContactState } from "../interfaces/ContactState.ts";
import { RootState } from "../../app/store.ts";
import { ContactApi } from "../interfaces/ContactApi.ts";


const initialState: ContactState = {
    contactData: [],
    contactArchivedData: [],
    selectedContact: null,
    status: "idle",
    statusArchived: "idle",
    archiveStatus: "idle",
    fetchByIdStatus: "idle",
    archiveError: "idle",
    error: "Default Error",
};

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactListThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchContactListThunk.fulfilled, (state, action: PayloadAction<ContactApi[]>) => {
                state.status = "fulfilled";
                state.contactData = action.payload;
            })
            .addCase(fetchContactListThunk.rejected, (state) => {
                state.status = "rejected";
                state.error = "Failed to fetch contact List";
            })
            .addCase(fetchContactByIdThunk.pending, (state) => {
                state.fetchByIdStatus = "pending";
            })
            .addCase(fetchContactByIdThunk.fulfilled, (state, action: PayloadAction<ContactApi>) => {
                state.fetchByIdStatus = "fulfilled";
                state.selectedContact = action.payload;
            })
            .addCase(fetchContactByIdThunk.rejected, (state) => {
                state.fetchByIdStatus = "rejected";
                state.error = "Failed to fetch contact by ID";
            })

            .addCase(fetchContactArchivedListThunk.pending, (state) => {
                state.statusArchived = "pending";
            })
            .addCase(fetchContactArchivedListThunk.fulfilled, (state, action: PayloadAction<ContactApi[]>) => {
                state.statusArchived = "fulfilled";
                state.contactArchivedData = action.payload;
            })
            .addCase(fetchContactArchivedListThunk.rejected, (state) => {
                state.statusArchived = "rejected";
                state.error = "Failed to fetch contact archived list";
            })

            .addCase(archiveContactThunk.pending, (state) => {
                state.archiveStatus = "pending";
            })
            .addCase(archiveContactThunk.fulfilled, (state, action: PayloadAction<ContactApi>) => {
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

export const getContactsData = (state: RootState) => state.contacts.contactData;
export const getContactsStatus = (state: RootState) => state.contacts.status;
export const getContactsError = (state: RootState) => state.contacts.error;
export const getContactsArchivedData = (state: RootState) => state.contacts.contactArchivedData;
export const getContactsArchivedStatus = (state: RootState) => state.contacts.statusArchived;
export const getArchiveStatus = (state: RootState) => state.contacts.archiveStatus;
export const getArchiveError = (state: RootState) => state.contacts.archiveError;
export const getFetchByIdStatus = (state: RootState) => state.contacts.fetchByIdStatus;
export const getSelectedContact = (state: RootState) => state.contacts.selectedContact;

