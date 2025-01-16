import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card2, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, Title, Label, TextArea, ButtonForm } from '../../rooms/pages/roomsCr.js';
import { MdDelete } from "react-icons/md";
import employes from '../../users/data/users.json';

export const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employe, setEmploye] = useState([]);
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
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/')
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        setEmploye(employes);


        const emp = employes.find((emp) => emp.id === parseInt(id));
        if (emp) {
            setFormData({
                photos: [],
                fullName: emp.fullName || '',
                id: emp.id || '',
                email: emp.email || '',
                startDate: parseDate(emp.startDate) || '',
                description: emp.description || '',
                puesto: emp.puesto || '',
                stade: emp.stade || false,
                password: emp.password || ''
            });
        }
    }, [id]);

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
            stade: e.target.checked
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
        if (!formData.fullName || !formData.email || !formData.id || !formData.puesto) {
            alert("Por favor, completa todos los campos requeridos.");
            return false;
        }
        return true;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate("/users");
        }
    };

    return (
        <>
            <Title>Edit Employee</Title>
            <Card2 onSubmit={handleSubmit}>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem">Puesto:</Label>
                        <select name="puesto" value={formData.puesto} onChange={handleInputChange}>
                            <option value="">Selecciona tipo puesto</option>
                            <option value="Manager">Manager</option>
                            <option value="Recepción">Recepción</option>
                            <option value="Servicio de Habitaciones">Servicio de Habitaciones</option>
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
                        <input value={formData.email} name="email" onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.8rem">Start Date:</Label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem">Description:</Label>
                        <TextArea value={formData.description} name="description" onChange={handleInputChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem">Estado:</Label>
                        <input type="checkbox" checked={formData.stade} name="stade" onChange={handleOfferChange} />
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.6rem" ml="1rem">Password:</Label>
                        <input value={formData.password} name="password" onChange={handleInputChange} />
                    </InputWrapper>
                </FormColumn>

                <PhotosWrapper>
                    <h2>Fotos</h2>
                    <input type="file" multiple onChange={handlePhotoUpload} />
                    {formData.photos.length > 0 && (
                        <div>
                            <ul style={{ listStyleType: "none" }}>
                                {formData.photos.map((photo, index) => (
                                    <li key={index}>
                                        <img src={URL.createObjectURL(photo)} alt="Uploaded" width="100" />
                                        <MdDelete type="button" onClick={() => handlePhotoDelete(index)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </PhotosWrapper>

                <SubmitButtonWrapper>
                    <ButtonForm type="submit">Update Employee</ButtonForm>
                </SubmitButtonWrapper>
            </Card2>
        </>
    );
};
