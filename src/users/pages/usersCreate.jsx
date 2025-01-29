import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThunk } from '../features/userThunks.js';
import { Card2, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, Title, Label } from '../../common/style/FormStyles.js';
import { ButtonForm } from "../../common/style/buttons"
import { MdDelete } from "react-icons/md";

export const UserCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.users.usersData);
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
        const originalFormat = format(formData);
        dispatch(addUserThunk(originalFormat));
        console.log("Form Data Submitted:", originalFormat);
        navigate("/users");

    };
    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const format = (formData) => {
        const newId = usersData.length > 0 ? Math.max(...usersData.map(user => user.id)) + 1 : 1;
        console.log(formData)
        return {
            id: newId,
            startDate: formatDate(formData.startDate),
            stade: formData.stade,
            puesto: formData.puesto,
            phone: formData.phone,
            password: formData.password,
            fullName: formData.fullName,
            email: formData.email,
            description: formData.description,
            /*  photos: formData.photos,*/
            photo: "/assets/img/employ1.jpg",
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
                        <Label mr="0.5rem" ml="3.6rem">Phone:</Label>
                        <input value={formData.phone} name="phone" onChange={handleInputChange}></input>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.8rem">Start Date:</Label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
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
                    <ButtonForm type="submit" onClick={handleSubmit}>Add Employe</ButtonForm>
                </SubmitButtonWrapper>
            </Card2>
        </>
    );
};
