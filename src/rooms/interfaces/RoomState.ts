import { RoomApi } from "./RoomApi";

export interface RoomState {
    roomsData: RoomApi[];
    selectedRoom: RoomApi | null;
    fetchStatus: "idle" | "pending" | "fulfilled" | "rejected";
    addStatus: "idle" | "pending" | "fulfilled" | "rejected";
    editStatus: "idle" | "pending" | "fulfilled" | "rejected";
    deleteStatus: "idle" | "pending" | "fulfilled" | "rejected";
    fetchByIdStatus: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | undefined;
}