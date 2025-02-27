import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThunk, deleteUserThunk, editUserThunk } from '../features/userThunks.js';
import { Card2, InputWrapper, FormColumn, SubmitButtonWrapper, PhotosWrapper, Title, Label, TextArea } from '../../common/style/FormStyles.js';
import { ButtonForm } from "../../common/style/buttons"
import { MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from '../../app/store.js';
import { IUserApi } from '../interfaces/IUserApi.js';
import { toast } from 'react-toastify';

export const UserEdit = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const selectedUser = useSelector((state: RootState) => state.users.selectedUser);
    const [formData, setFormData] = useState<IUserApi>({
        photo: '',
        fullName: '',
        _id: '',
        email: '',
        startDate: '',
        description: '',
        puesto: '',
        stade: false,
        password: '',
        phone: ''
    });
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/')
        return `${year}-${month}-${day}`;
    };
    const parseDateBack = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`;
    };
    useEffect(() => {
        if (selectedUser) {
            setFormData({
                photo: selectedUser.photo,
                fullName: selectedUser.fullName || '',
                _id: selectedUser._id || '',
                email: selectedUser.email || '',
                startDate: selectedUser.startDate || '',
                description: selectedUser.description || '',
                puesto: selectedUser.puesto || '',
                stade: selectedUser.stade || false,
                password: selectedUser.password || '',
                phone: selectedUser.phone || ''
            });
        }
    }, [selectedUser]);

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
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                photo: file,
            });
        }
    };

    const handlePhotoDelete = () => {
        setFormData({
            ...formData,
            photo: '',
        });
    };
    const validate = () => {
        if (!formData.fullName || !formData.email || !formData._id || !formData.puesto) {
            alert("Por favor, completa todos los campos requeridos.");
            return false;
        }
        return true;
    };


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate()) {
            const originalFormat = format(formData);
            if (originalFormat._id != selectedUser!._id) {
                dispatch(deleteUserThunk(selectedUser!._id));
                dispatch(addUserThunk(originalFormat))
                    .then(() => {
                        toast.success('Modificado con éxito', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                    .catch((error) => {
                        toast.error('Hubo un error al modificar', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            } else {
                dispatch(editUserThunk(originalFormat)).then(() => {
                    toast.success('Modificado con éxito', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                    .catch((error) => {
                        toast.error('Hubo un error al modificar', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });;
            }
            navigate("/users/");
        }
    };
    const format = (formData: IUserApi) => {
        return {
            photo: formData.photo,
            fullName: formData.fullName,
            _id: formData._id,
            email: formData.email,
            startDate: formData.startDate,
            description: formData.description,
            puesto: formData.puesto,
            stade: formData.stade,
            password: formData.password,
            phone: formData.phone
        };
    };

    return (
        <>
            <Title>Edit Employee</Title>
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
                        <input type="string" name="id" value={formData._id} onChange={handleInputChange} />
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
                    <h2>Foto</h2>
                    <input type="file" onChange={handlePhotoUpload} />

                    {formData.photo ? (
                        <div>
                            <ul style={{ listStyleType: "none" }}>
                                <li>
                                    <img src={formData.photo} alt="Uploaded" width="100" />
                                    <MdDelete type="button" onClick={handlePhotoDelete} />
                                </li>
                            </ul>
                        </div>
                    ) : <></>}
                </PhotosWrapper>

                <SubmitButtonWrapper>
                    <ButtonForm type="button" onClick={handleSubmit}>Update Employee</ButtonForm>
                </SubmitButtonWrapper>
            </Card2>
        </>
    );
};
