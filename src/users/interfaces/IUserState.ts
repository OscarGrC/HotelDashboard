import { IUserApi } from "./IUserApi";

export interface UserState {
    usersData: IUserApi[];
    selectedUser: IUserApi | null;
    fetchStatus: "idle" | "pending" | "fulfilled" | "rejected";
    addStatus: "idle" | "pending" | "fulfilled" | "rejected";
    editStatus: "idle" | "pending" | "fulfilled" | "rejected";
    deleteStatus: "idle" | "pending" | "fulfilled" | "rejected";
    fetchByIdStatus: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | undefined;
}