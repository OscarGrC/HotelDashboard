
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, PhotosWrapper, AmenitiesWrapper, Title } from './roomsCr.js';

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
    const room = useSelector((state) => state.rooms.selectedRoom);
    const [formData, setFormData] = useState({
        photos: [],
        roomType: '',
        roomNumber: '',
        description: '',
        offer: false,
        price: '',
        discount: '',
        cancellation: '',
        floor: '',
        amenities: [],
    });


    useEffect(() => {
        if (room) {
            const { floor, number } = parseRoomNumber(room.room_number);
            setFormData({
                photos: room.photos || [],
                roomType: room.room_type || '',
                roomNumber: number || '',
                description: room.description || '',
                offer: room.offer || false,
                price: room.price || '',
                discount: room.offert_price || '',
                cancellation: room.cancelation || '',
                floor: floor || '',
                amenities: room.amenities || [],
            });
        } else {
            console.error("Room not found");
        }
    }, [room]);

    const parseRoomNumber = (roomNumber) => {
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
                    <p><strong>Room Type:</strong> {formData.roomType}</p>
                    <p><strong>Room Number:</strong> {formData.roomNumber}</p>
                    <p><strong>Floor:</strong> {formData.floor}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Offer:</strong> {formData.offer ? "Yes" : "No"}</p>
                    <p><strong>Price:</strong> {formData.price}</p>
                    <p><strong>Discount:</strong> {formData.discount}</p>
                    <p><strong>Cancellation Policy:</strong> {formData.cancellation}</p>
                </div>

                <PhotosWrapper>
                    <h2>Photos</h2>
                    {formData.photos.length > 0 && (
                        <ul style={{ listStyleType: "none" }}>
                            {formData.photos.map((photo, index) => (
                                <li key={index}>
                                    <img src={photo} alt={`Uploaded ${index}`} width="200" />
                                </li>
                            ))}
                        </ul>
                    )}
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
