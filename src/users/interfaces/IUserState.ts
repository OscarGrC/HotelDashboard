import { StatusEnum } from "../../common/interfaces/statusEnum";
import { IUserApi } from "./IUserApi";

export interface UserState {
    usersData: IUserApi[];
    selectedUser: IUserApi | null;
    fetchStatus: StatusEnum;
    addStatus: StatusEnum;
    editStatus: StatusEnum;
    deleteStatus: StatusEnum;
    fetchByIdStatus: StatusEnum;
    error: string | undefined;
}