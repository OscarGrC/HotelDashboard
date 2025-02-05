export interface RoomFormData {
    photos: File[];
    room_type: string;
    room_number: string;
    description: string;
    offert: boolean;
    price: number;
    discount: number;
    cancellation: string;
    floor: string;
    amenities: number[];
}