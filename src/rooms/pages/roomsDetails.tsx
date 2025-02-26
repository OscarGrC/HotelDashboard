import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, PhotosWrapper, AmenitiesWrapper, Title } from '../../common/style/FormStyles.js';
import { RootState } from '../../app/store.js';
import { RoomFormData } from '../interfaces/RoomFormData.js';

const amenitiesMap = {
    1: "Wi-Fi",
    2: "A/C",
    3: "Televisión",
    4: "Mini Bar",
    5: "Cama King Size",
    6: "Escritorio de trabajo",
    7: "Caja de seguridad",
    8: "Servicio de habitaciones",
    9: "Bañera",
    10: "Terraza privada",
};

export const RoomDetails = () => {
    const room = useSelector((state: RootState) => state.rooms.selectedRoom);
    const [formData, setFormData] = useState<RoomFormData>({
        photos: [],
        type: '',
        number: '',
        description: '',
        offert: false,
        price: 0,
        discount: 0,
        cancellation: '',
        floor: '1',
        amenities: [],
        _id: ''
    });


    useEffect(() => {
        if (room != null) {
            const { floor, number } = parseRoomNumber(room.number);
            setFormData({
                photos: room.photos,
                type: room.type,
                number: number || '',
                description: room.description || '',
                offert: room.offert || false,
                price: room.price,
                discount: room.offert_price,
                cancellation: room.cancelation,
                floor: floor,
                amenities: room.amenities,
                _id: room._id
            });
        } else {
            console.error("Room not found");
        }
    }, [room]);

    const parseRoomNumber = (roomNumber: string) => {
        if (roomNumber === undefined || roomNumber === null) {
            return { floor: '', number: '' };
        }
        console.log(roomNumber)
        const match = roomNumber.match(/^R(\d)(\d{2})$/);
        if (!match) {
            console.error("Formato inválido para room_number:", roomNumber);
            return { floor: '', number: '' };
        }
        const floor = match[1];
        const number = match[2];
        return { floor, number };
    };

    return (
        <>
            <Title>Room Details</Title>
            <Card>
                <div>
                    <p><strong>Room Type:</strong> {formData.type}</p>
                    <p><strong>Room Number:</strong> {formData.number}</p>
                    <p><strong>Floor:</strong> {formData.floor}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Offer:</strong> {formData.offert ? "Yes" : "No"}</p>
                    <p><strong>Price:</strong> {formData.price}</p>
                    <p><strong>Discount:</strong> {formData.discount}</p>
                    <p><strong>Cancellation Policy:</strong> {formData.cancellation}</p>
                </div>

                <PhotosWrapper>
                    <h2>Photos</h2>
                    {formData.photos.length > 0 ? (
                        <ul style={{ listStyleType: "none" }}>
                            {formData.photos.map((photo, index) => (
                                <li key={index}>
                                    <img src={photo} alt={`Uploaded ${index}`} width="200" />
                                </li>
                            ))}
                        </ul>
                    ) : <></>}
                </PhotosWrapper>

                <AmenitiesWrapper>
                    <h2>Amenities</h2>
                    {Object.keys(amenitiesMap).map((key) => (
                        <p key={key}>
                            <strong>{amenitiesMap[key]}:</strong> {formData.amenities.includes(parseInt(key)) ? "Yes" : "No"}
                        </p>
                    ))}
                </AmenitiesWrapper>
            </Card>
        </>
    );
};
