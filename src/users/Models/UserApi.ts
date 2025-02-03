import { Puesto } from "../Models/Puesto";
import { IUserApi } from "../interfaces/IUserApi";
import { User } from "./User";

export class UserApi implements IUserApi {
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

    constructor(id: number, photo: string, fullName: string, puesto: string, email: string, phone: string,
        startDate: string, description: string, stade: boolean, password: string) {
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

    parseDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    toUser(): User {
        return new User(this.id, this.photo, this.fullName, Puesto[this.puesto as keyof typeof Puesto],
            this.email, this.phone, new Date(this.parseDate(this.startDate)), this.description,
            this.stade, this.password)
    }
}
