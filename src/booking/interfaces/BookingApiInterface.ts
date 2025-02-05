import { BookingGuestInterface } from "./BookingGuestInterface";
import { BookingRoomInterface } from "./BookingRoomInterface";

export interface BookingApiInterface {
    guest: BookingGuestInterface;
    order_date: string;
    check_in: string;
    check_out: string;
    room: BookingRoomInterface;
    special_request?: string;
}
