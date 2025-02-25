import React, { useState, useEffect } from 'react';
import { Card2, InputWrapper, FormColumn, PhotosWrapper, Title, Label } from '../../common/style/FormStyles.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.js';
import { IUserApi } from '../interfaces/IUserApi.js';
import { useNavigate } from 'react-router-dom';

export const UserDetail = () => {
    const emp = useSelector((state: RootState) => state.users.selectedUser);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IUserApi>({
        photo: '',
        fullName: '',
        _id: ' ',
        email: '',
        startDate: '',
        description: '',
        puesto: '',
        stade: false,
        password: '',
        phone: ''
    });
    const parseDate = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`;
    };
    const parseStade = (stade: boolean) => {
        if (stade) {
            return "Activo"
        }
        return "Antiguo";
    };
    useEffect(() => {
        if (emp != null) {
            setFormData({
                photo: emp.photo,
                fullName: emp.fullName || '',
                _id: emp._id || ' ',
                email: emp.email || '',
                startDate: emp.startDate || '',
                description: emp.description || '',
                puesto: emp.puesto || '',
                stade: emp.stade || false,
                password: emp.password || '',
                phone: emp.phone
            });
        }
    }, [emp]);

    const validate = () => {
        if (!formData.fullName || !formData.email || !formData._id || !formData.puesto) {
            alert("Por favor, completa todos los campos requeridos.");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate() === true) {
            navigate("/users");
        }
    };

    return (
        <>
            <Title>Employee</Title>
            <Card2 onSubmit={handleSubmit}>
                <FormColumn>
                    <PhotosWrapper>
                        <img src={formData.photo} style={{ width: '100px', height: '100px', marginLeft: "20rem" }} />

                    </PhotosWrapper>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="3rem" style={{ marginTop: '16px' }}>Puesto:</Label>
                        <p >
                            {formData.puesto}
                        </p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.9rem" style={{ marginTop: '16px' }}>Full Name:</Label>
                        <p>{formData.fullName}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="5.8rem" style={{ marginTop: '16px' }}>ID:</Label>
                        <p>{formData._id}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="3.6rem" style={{ marginTop: '16px' }}>Email:</Label>
                        <p>{formData.email}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.8rem" style={{ marginTop: '16px' }}>Start Date:</Label>
                        <p>{parseDate(formData.startDate)}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem" style={{ marginTop: '16px' }}>Description:</Label>
                        <p>{formData.description}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem" style={{ marginTop: '16px' }}>Estado:</Label>
                        <p>{parseStade(formData.stade)}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.6rem" ml="1rem" style={{ marginTop: '16px' }}>Password:</Label>
                        <p>{formData.password}</p>
                    </InputWrapper>
                </FormColumn>
            </Card2>
        </>
    );
};
