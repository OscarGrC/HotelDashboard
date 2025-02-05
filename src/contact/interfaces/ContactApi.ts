import { ContactCustomer } from "./ContactCustomer";

export interface ContactApi {
    date: string;
    id: number;
    customer: ContactCustomer;
    asunto: string;
    comment: string;
}