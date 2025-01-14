import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Error, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, AmenitiesWrapper, Title, Label, TextArea, ButtonForm } from './roomsCr.js';
import { MdDelete } from "react-icons/md";
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


export const RoomCreate = () => {
    const navigate = useNavigate();

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

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOfferChange = (e) => {
        setFormData({
            ...formData,
            offer: e.target.checked
        });
    };

    const handleAmenitiesChange = (e) => {
        const value = parseInt(e.target.value);
        const newAmenities = formData.amenities.includes(value)
            ? formData.amenities.filter((amenity) => amenity !== value)
            : [...formData.amenities, value];
        setFormData({
            ...formData,
            amenities: newAmenities,
        });
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            photos: [...formData.photos, ...files],
        });
    };

    const handlePhotoDelete = (index) => {
        const newPhotos = formData.photos.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            photos: newPhotos,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.roomType) newErrors.roomType = "El tipo de habitación es obligatorio.";
        if (!formData.roomNumber) newErrors.roomNumber = "El número de habitación es obligatorio.";
        if (!formData.description) newErrors.description = "La descripción es obligatoria.";
        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = "El precio debe ser un número mayor a 0.";
        }
        if (!formData.discount || isNaN(formData.discount) || parseFloat(formData.discount) < 0 || parseFloat(formData.discount) > 100) {
            newErrors.discount = "El descuento debe estar entre 0 y 100.";
        }
        if (!formData.cancellation) newErrors.cancellation = "La política de cancelación es obligatoria.";
        if (formData.photos.length < 3 || formData.photos.length > 5) {
            newErrors.photos = "Debe haber entre 3 y 5 fotos.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data Submitted:", formData);
            navigate("/Rooms");
        }
    };

    return (
        <>
            <Title>Create Room</Title>
            <Card>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="4.8rem">Room Type:</Label>
                        <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                            <option value="">Selecciona el tipo de habitación</option>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </select>
                        {errors.roomType && <Error>{errors.roomType}</Error>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem">Room Number:</Label>
                        <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} />
                        {errors.roomNumber && <Error>{errors.roomNumber}</Error>}
                    </InputWrapper>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Floor:</Label>
                        <input type="number" name="floor" value={formData.floor} onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="4.7rem">Description:</Label>
                        <TextArea name="description" value={formData.description} onChange={handleInputChange}></TextArea>
                        {errors.description && <Error>{errors.description}</Error>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Offer:</Label>
                        <input type="checkbox" checked={formData.offer} onChange={handleOfferChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="8.7rem">Price:</Label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                        {errors.price && <Error>{errors.price}</Error>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="6.3rem">Discount:</Label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                        {errors.discount && <Error>{errors.discount}</Error>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.6rem" ml="0rem">Cancellation Policy:</Label>
                        <TextArea name="cancellation" value={formData.cancellation} onChange={handleInputChange}></TextArea>
                        {errors.cancellation && <Error>{errors.cancellation}</Error>}
                    </InputWrapper>

                </FormColumn>

                <div>
                    <PhotosWrapper>
                        <h2>Fotos</h2>
                        <input type="file" multiple onChange={handlePhotoUpload} />
                        {formData.photos.length > 0 && (
                            <div>
                                <ul style={{ listStyleType: "none" }}>
                                    {formData.photos.map((photo, index) => (
                                        <li key={index}>
                                            <img src={URL.createObjectURL(photo)} alt="Uploaded" width="100" />
                                            <MdDelete type="button" onClick={() => handlePhotoDelete(index)}></MdDelete>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {errors.photos && <Error>{errors.photos}</Error>}
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
                    <ButtonForm type="submit">Add Room</ButtonForm>
                </SubmitButtonWrapper>
            </Card>
        </>
    );
};
