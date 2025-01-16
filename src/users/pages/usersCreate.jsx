import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card2, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, AmenitiesWrapper, Title, Label, TextArea, ButtonForm } from '../../rooms/pages/roomsCr.js';
import { MdDelete } from "react-icons/md";

export const UserCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        photos: [],
        fullName: '',
        id: '',
        email: '',
        startDate: '',
        description: '',
        puesto: '',
        stade: false,
        password: ''
    });

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
            estado: e.target.checked
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data Submitted:", formData);
            navigate("/Rooms");
        }
    };

    return (
        <>
            <Title>Create Employee</Title>
            <Card2>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem">Description:</Label>
                        <select name="puesto" value={formData.puesto} onChange={handleInputChange}>
                            <option value="">Selecciona tipo puesto</option>
                            <option value="Manager">Manager</option>
                            <option value="Recepción">Recepción</option>
                            <option value=" Servicio de Habitaciones"> Servicio de Habitaciones</option>
                        </select>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.9rem">Full Name:</Label>
                        <input name="fullName" value={formData.fullName} onChange={handleInputChange} />
                    </InputWrapper>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="5.8rem">ID:</Label>
                        <input type="number" name="id" value={formData.id} onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="3.6rem">Email:</Label>
                        <input value={formData.email} name="email" onChange={handleInputChange}></input>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.8rem">Start Date:</Label>
                        <input type="calendar" name="startDate" checked={formData.startDate} onChange={handleOfferChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem">Description:</Label>
                        <input value={formData.description} name="description" onChange={handleInputChange} />

                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem">Estado:</Label>
                        <input type='checkbox' value={formData.stade} name="stade" onChange={handleInputChange} />

                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.6rem" ml="1rem">Password:</Label>
                        <input value={formData.password} name="password" onChange={handleInputChange}></input>
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
                    </PhotosWrapper>

                </div>

                <SubmitButtonWrapper>
                    <ButtonForm type="submit">Add Employe</ButtonForm>
                </SubmitButtonWrapper>
            </Card2>
        </>
    );
};
