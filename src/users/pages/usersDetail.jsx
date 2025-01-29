import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card2, InputWrapper, FormColumn, PhotosWrapper, Title, Label } from '../../common/style/FormStyles.js';
import { ButtonForm } from "../../common/style/buttons"
import { useSelector } from 'react-redux';

export const UserDetail = () => {
    const emp = useSelector((state) => state.users.selectedUser);
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
        if (emp) {
            setFormData({
                photo: emp.photo,
                fullName: emp.fullName || '',
                id: emp.id || '',
                email: emp.email || '',
                startDate: parseDate(emp.startDate) || '',
                description: emp.description || '',
                puesto: emp.puesto || '',
                stade: `${emp.stade}` || "false",
                password: emp.password || ''
            });
        }
    }, [emp]);


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
                        <p>{formData.id}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="3.6rem" style={{ marginTop: '16px' }}>Email:</Label>
                        <p>{formData.email}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0.8rem" style={{ marginTop: '16px' }}>Start Date:</Label>
                        <p>{formData.startDate}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="0rem" style={{ marginTop: '16px' }}>Description:</Label>
                        <p>{formData.description}</p>
                    </InputWrapper>

                    <InputWrapper>
                        <Label mr="0.5rem" ml="2.8rem" style={{ marginTop: '16px' }}>Estado:</Label>
                        <p>{formData.stade}</p>
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
