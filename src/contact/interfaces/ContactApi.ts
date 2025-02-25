import { ContactCustomer } from "./ContactCustomer";

export interface ContactApi {
    date: string;
    _id: string;
    customer: ContactCustomer;
    asunto: string;
    comment: string;
}