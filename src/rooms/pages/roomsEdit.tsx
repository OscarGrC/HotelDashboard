import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editRoomThunk } from '../features/roomThunks.js';
import { Card, Error, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, AmenitiesWrapper, Title, Label, TextArea } from '../../common/style/FormStyles.js';
import { ButtonForm } from "../../common/style/buttons.js"
import { MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from '../../app/store.js';
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

export const RoomEdit = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const selectedRoom = useSelector((state: RootState) => state.rooms.selectedRoom);
    const [formData, setFormData] = useState<RoomFormData>({
        photos: [],
        room_type: '',
        room_number: '',
        description: '',
        offert: false,
        price: 0,
        discount: 0,
        cancellation: '',
        floor: '',
        amenities: [],
        id: 0
    });
    const defaultErrors: {
        roomType?: string;
        roomNumber?: string;
        description?: string;
        price?: string;
        discount?: string;
        cancellation?: string;
        photos?: string;
    } = {}
    const [errors, setErrors] = useState(defaultErrors);

    useEffect(() => {
        if (selectedRoom != null) {
            const { floor, number } = parseRoomNumber(selectedRoom.room_number);
            setFormData({
                photos: selectedRoom.photos || [],
                room_type: selectedRoom.room_type || '',
                room_number: number || '',
                description: selectedRoom.description || '',
                offert: selectedRoom.offert || false,
                price: selectedRoom.price || 0,
                discount: selectedRoom.offert_price || 0,
                cancellation: selectedRoom.cancelation || '',
                floor: floor || '',
                amenities: selectedRoom.amenities || [],
                id: selectedRoom.id,
            });
        }
    }, [selectedRoom]);

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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOfferChange = (e: any) => {
        setFormData({
            ...formData,
            offert: e.target.checked
        });
    };

    const handleAmenitiesChange = (e: any) => {
        const value = parseInt(e.target.value);
        const newAmenities = formData.amenities.includes(value)
            ? formData.amenities.filter((amenity) => amenity !== value)
            : [...formData.amenities, value];
        setFormData({
            ...formData,
            amenities: newAmenities,
        });
    };

    const handlePhotoUpload = (e: any) => {
        const files = Array.from(e.target.files) as File[];
        const newPhotoURLs = files.map(file => URL.createObjectURL(file));

        setFormData({
            ...formData,
            photos: [...formData.photos, ...newPhotoURLs],
        });
    };


    const handlePhotoDelete = (index: number) => {
        const newPhotos = formData.photos.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            photos: newPhotos,
        });
    };

    const validate = () => {
        const newErrors: {
            roomType?: string;
            roomNumber?: string;
            description?: string;
            price?: string;
            discount?: string;
            cancellation?: string;
        } = {};
        if (!formData.room_type) newErrors.roomType = "El tipo de habitación es obligatorio.";
        if (!formData.room_number) newErrors.roomNumber = "El número de habitación es obligatorio.";
        if (!formData.description) newErrors.description = "La descripción es obligatoria.";
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "El precio debe ser un número mayor a 0.";
        }
        if (!formData.discount || isNaN(formData.discount) || formData.discount < 0 || formData.discount > 100) {
            newErrors.discount = "El descuento debe estar entre 0 y 100.";
        }
        if (!formData.cancellation) newErrors.cancellation = "La política de cancelación es obligatoria.";
        /*   if (formData.photos.length < 3 || formData.photos.length > 5) {
               newErrors.photos = "Debe haber entre 3 y 5 fotos.";
           }*/
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            const originalFormat = format(formData);
            dispatch(editRoomThunk(originalFormat));
            navigate("/rooms");
        }
    };

    const format = (formData: RoomFormData) => {
        const room_number = `R${formData.floor}${formData.room_number}`;

        return {
            room_number,
            room_type: formData.room_type,
            amenities: formData.amenities,
            price: formData.price,
            offert_price: formData.discount,
            offert: Boolean(formData.offert),
            status: formData.offert,
            cancelation: formData.cancellation,
            description: formData.description,
            photos: formData.photos,
            id: formData.id
        };
    };


    return (
        <>
            <Title>Edit Room</Title>
            <Card>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="4.8rem">Room Type:</Label>
                        <select name="roomType" value={formData.room_type} onChange={handleInputChange}>
                            <option value="">Selecciona el tipo de habitación</option>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                        {errors.roomType ? <Error>{errors.roomType}</Error> : <></>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem">Room Number:</Label>
                        <input type="number" name="roomNumber" value={formData.room_number} onChange={handleInputChange} />
                        {errors.roomNumber ? <Error>{errors.roomNumber}</Error> : <></>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Floor:</Label>
                        <input type="number" name="floor" value={formData.floor} onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="4.7rem">Description:</Label>
                        <TextArea name="description" value={formData.description} onChange={handleInputChange}></TextArea>
                        {errors.description ? <Error>{errors.description}</Error> : <></>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Offer:</Label>
                        <input type="checkbox" checked={formData.offert} onChange={handleOfferChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Price:</Label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                        {errors.price ? <Error>{errors.price}</Error> : <></>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="6.3rem">Discount:</Label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                        {errors.discount ? <Error>{errors.discount}</Error> : <></>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.6rem" ml="0rem">Cancellation Policy:</Label>
                        <TextArea name="cancellation" value={formData.cancellation} onChange={handleInputChange}></TextArea>
                        {errors.cancellation ? <Error>{errors.cancellation}</Error> : <></>}
                    </InputWrapper>
                </FormColumn>

                <div>
                    <PhotosWrapper>
                        <h2>Fotos</h2>
                        <input type="file" multiple onChange={handlePhotoUpload} />
                        {formData.photos.length > 0 ? (
                            <div>
                                <ul style={{ listStyleType: "none" }}>
                                    {formData.photos.map((photo, index) => (
                                        <li key={index}>
                                            <img src={photo} alt="Uploaded" width="100" />
                                            <MdDelete type="button" onClick={() => handlePhotoDelete(index)}></MdDelete>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : <></>}
                        {errors.photos ? <Error>{errors.photos}</Error> : <></>}
                    </PhotosWrapper>

                    <AmenitiesWrapper>
                        <h2>Amenities</h2>
                        {Object.keys(amenitiesMap).map((key) => (
                            <div key={key}>
                                <input
                                    type="checkbox"
                                    value={key}
                                    checked={formData.amenities.includes(parseInt(key))}
                                    onChange={handleAmenitiesChange}
                                />
                                <label>{amenitiesMap[key]}</label>
                            </div>
                        ))}
                    </AmenitiesWrapper>
                </div>

                <SubmitButtonWrapper>
                    <ButtonForm type="submit" onClick={handleSubmit}>Edit</ButtonForm>
                </SubmitButtonWrapper>
            </Card>
        </>
    );

};
