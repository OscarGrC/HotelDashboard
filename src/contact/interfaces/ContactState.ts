import { ContactApi } from "./ContactApi";

export interface ContactState {
    contactData: ContactApi[];
    contactArchivedData: ContactApi[],
    selectedContact: ContactApi | null;
    status: "idle" | "pending" | "fulfilled" | "rejected";
    statusArchived: "idle" | "pending" | "fulfilled" | "rejected";
    archiveStatus: "idle" | "pending" | "fulfilled" | "rejected";
    fetchByIdStatus: "idle" | "pending" | "fulfilled" | "rejected";
    archiveError: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | undefined;
}
