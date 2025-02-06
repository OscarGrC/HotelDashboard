import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThunk } from '../features/userThunks.js';
import { Card2, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, Title, Label } from '../../common/style/FormStyles.js';
import { ButtonForm } from "../../common/style/buttons"
import { MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from '../../app/store.js';
import { IUserApi } from '../interfaces/IUserApi.js';

export const UserCreate// :React.FC// 
    = () => {
        const navigate = useNavigate();
        const dispatch: AppDispatch = useDispatch();
        const usersData = useSelector((state: RootState) => state.users.usersData);

        const [formData, setFormData] = useState<Partial<IUserApi>>({
            photo: "",
            fullName: '',
            email: '',
            startDate: '',
            description: '',
            puesto: '',
            stade: false,
            password: '',
            phone: ""
        });

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

            setFormData((prev) => ({
                ...prev,
                [name]: newValue
            }));
        };



        const handlePhotoDelete = () => {
            setFormData((prev) => ({
                ...prev,
                photo: ""
            }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const formattedData = format(formData);
            dispatch(addUserThunk(formattedData));
            navigate("/users");
        };

        const formatDate = (date: string) => {
            if (!date) return '';
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        };

        const format = (formData: Partial<IUserApi>) => {

            return {
                startDate: formatDate(formData.startDate!),
                stade: formData.stade,
                puesto: formData.puesto,
                phone: formData.phone,
                password: formData.password,
                fullName: formData.fullName,
                email: formData.email,
                description: formData.description,
                photo: "/assets/img/employ1.jpg",
            };
        };

        return (
            <>
                <Title>Create Employee</Title>
                <Card2>
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
                            <input type="email" value={formData.email} name="email" onChange={handleInputChange} />
                        </InputWrapper>

                        <InputWrapper>
                            <Label mr="0.5rem" ml="3.6rem">Phone:</Label>
                            <input type="tel" value={formData.phone} name="phone" onChange={handleInputChange} />
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
                            <input type="checkbox" checked={formData.stade} name="stade" onChange={handleInputChange} />
                        </InputWrapper>

                        <InputWrapper>
                            <Label mr="0.6rem" ml="1rem">Password:</Label>
                            <input type="password" value={formData.password} name="password" onChange={handleInputChange} />
                        </InputWrapper>
                    </FormColumn>

                    <div>
                        <PhotosWrapper>
                            <h2>Foto</h2>
                            <input type="file" accept="image/*" />
                            {formData.photo ? (
                                <div>
                                    <img src={formData.photo} alt="Uploaded" width="100" />
                                    <MdDelete type="button" onClick={handlePhotoDelete} />
                                </div>
                            ) : <></>}
                        </PhotosWrapper>
                    </div>

                    <SubmitButtonWrapper>
                        <ButtonForm type="submit" onClick={handleSubmit}>Add Employee</ButtonForm>
                    </SubmitButtonWrapper>
                </Card2>
            </>
        );
    };
