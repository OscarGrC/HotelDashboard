import { Puesto } from "../Models/Puesto";
import { IUser } from "../interfaces/IUser";
import { UserApi } from "./UserApi";

export class User implements IUser {
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

    constructor(id: number, photo: string, fullName: string, puesto: Puesto, email: string, phone: string,
        startDate: Date, description: string, stade: boolean, password: string) {
        this.id = id;
        this.photo = photo;
        this.fullName = fullName;
        this.puesto = puesto;
        this.email = email;
        this.phone = phone;
        this.startDate = startDate;
        this.description = description;
        this.stade = stade;
        this.password = password;
    }

    parseDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    toUserApi(): UserApi {
        return new UserApi(this.id, this.photo, this.fullName, this.puesto.toString(), this.email,
            this.phone, this.parseDate(this.startDate), this.description, this.stade, this.password)

    }


}