import { Puesto } from "../Models/Puesto";

export interface IUserApi {
    id: number;
    photo: string;
    fullName: string;
    puesto: Puesto | string;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    stade: boolean;
    password: string;
}
