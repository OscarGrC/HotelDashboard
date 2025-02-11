import { StatusEnum } from "../../common/interfaces/statusEnum";
import { RoomApi } from "./RoomApi";

export interface RoomState {
    roomsData: RoomApi[];
    selectedRoom: RoomApi | null;
    fetchStatus: StatusEnum;
    addStatus: StatusEnum;
    editStatus: StatusEnum;
    deleteStatus: StatusEnum;
    fetchByIdStatus: StatusEnum;
    error: string | undefined;
}