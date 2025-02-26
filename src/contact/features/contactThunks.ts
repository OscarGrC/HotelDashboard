import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactApi } from "../interfaces/ContactApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbGx5LmNoYW1wbGluQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkS1kyMDJ6cVN3L0xRWDhXWkpRc3lzZS9pMUl2VlBhWWw3aHZ0VENOY001SjJEdE13Tzg3OS4iLCJpYXQiOjE3NDA0NzM5NjksImV4cCI6MTc0MTA3ODc2OX0._OlVSqpY7SGjn_F7f3BArE2kpyGsdBi8ksmw68JX-Rw"

export const fetchContactListThunk = createAsyncThunk<ContactApi[], void>(
    "contact/fetchContactList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data: ContactApi[] = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch contact");
        }
    }
);

export const fetchContactArchivedListThunk = createAsyncThunk<ContactApi[]>(
    "contact/archived/fetchContactArchivedList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/archived`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data: ContactApi[] = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch Archived contact");
        }
    }
);
export const archiveContactThunk = createAsyncThunk<ContactApi, ContactApi>(
    "contact/archiveContact",
    async (contact, thunkAPI) => {
        try {

            //Archivar el contacto con toda su data
            const archiveResponse = await fetch(`${API_BASE_URL}/contact/archived`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(contact),
            });

            if (!archiveResponse.ok) throw new Error(`Error ${archiveResponse.status}: ${archiveResponse.statusText}`);

            const archivedContact: ContactApi = await archiveResponse.json();

            //Eliminar el contacto de la lista activa
            const deleteResponse = await fetch(`${API_BASE_URL}/contact/${contact._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!deleteResponse.ok) throw new Error(`Error ${deleteResponse.status}: ${deleteResponse.statusText}`);

            return archivedContact;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to archive and delete contact");
        }
    }
);



export const fetchContactByIdThunk = createAsyncThunk<ContactApi, string>(
    "contact/fetchContactById",
    async (contactId, thunkAPI) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/${contactId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch contact by ID");
        }
    }
);