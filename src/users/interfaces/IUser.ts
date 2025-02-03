import { Puesto } from "../Models/Puesto";

export interface IUser {
    id: number;
    photo: string;
    fullName: string;
    puesto: Puesto;
    email: string;
    phone: string;
    startDate: Date;
    description: string;
    stade: boolean;
    password: string;
}
