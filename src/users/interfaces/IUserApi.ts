import { IUser } from "./IUser";

export interface IUserApi {
    id: number;
    photo: string;
    fullName: string;
    puesto: string;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    stade: boolean;
    password: string;

    parseDate(dateString: string): string;
    toUser(): IUser;
}
