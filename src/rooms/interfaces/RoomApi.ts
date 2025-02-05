export interface RoomApi {
    id: number;
    room_number: string;
    room_type: string;
    amenities: number[];
    price: number;
    offert_price: number;
    offert: boolean;
    status: boolean;
    cancelation: string;
    description: string;
    photos: string[];
}
