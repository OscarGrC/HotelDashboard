import { StatusEnum } from '../../common/interfaces/statusEnum';
import { BookingApiInterface } from './BookingApiInterface'

export interface BookingState {
    bookingData: BookingApiInterface[];
    selectedBooking: BookingApiInterface | null;
    fetchStatus: StatusEnum;
    addStatus: StatusEnum;
    editStatus: StatusEnum;
    deleteStatus: StatusEnum;
    fetchByIdStatus: StatusEnum;
    error: string | undefined;
}
