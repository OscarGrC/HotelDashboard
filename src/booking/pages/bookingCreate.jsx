import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookingThunk } from '../features/bookingThunks';
import { Title, Card2, InputWrapper, FormColumn, Label, SubmitButtonWrapper, ButtonForm, TextArea } from '../../rooms/pages/roomsCr';
import { useNavigate } from 'react-router-dom';

export const BookingCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.roomsData);


    const [formData, setFormData] = useState({
        check_in: '',
        check_out: '',
        guest: { name: '', last_name: '', id: '' },
        room: { type: '', number: '' },
        special_request: ''
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRoomChange = (e) => {
        const roomNumber = e.target.value;
        const selectedRoom = rooms.find((room) => room.number === roomNumber);
        setFormData({
            ...formData,
            room: { type: selectedRoom?.type || '', number: roomNumber }
        });
    };
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/')
        return `${year}-${month}-${day}`;
    };
    const parseDateBack = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const originalFormat = format(formData);
        dispatch(addBookingThunk(originalFormat));
        navigate("/bookings");

    };
    const format = (formData) => {
        return {
            check_in: parseDateBack(formData.check_in),
            check_out: parseDateBack(formData.check_out),
            guest: { name: formData.guest.name, last_name: formData.guest.last_name, id: selectedBooking.guest.id },
            room: { type: formData.room.type, number: formData.room.number },
            special_request: formData.special_request,
            order_date: selectedBooking.order_date,
        };
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts.length === 2) {
            setFormData({
                ...formData,
                [nameParts[0]]: {
                    ...formData[nameParts[0]],
                    [nameParts[1]]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    return (
        <>
            <Title>Edit Booking</Title>
            <Card2 onSubmit={handleSubmit}>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '2px' }}>Check-In:</Label>
                        <input style={{ borderRadius: '10px', border: 'none' }}
                            type="date"
                            name="check_in"
                            value={formData.check_in}
                            onChange={handleChange}
                        />
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '2px' }}>Check-Out:</Label>
                        <input style={{ borderRadius: '10px', border: 'none' }}
                            type="date"
                            name="check_out"
                            value={formData.check_out}
                            onChange={handleChange}
                        />
                    </InputWrapper>
                    <Label mr="0.5rem" ml="3rem" style={{ marginTop: '13px' }}>Cliente</Label>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Nombre:</Label>
                        <input value={formData.guest.name} name="guest.name" onChange={handleInputChange} style={{ borderRadius: '10px', border: 'none' }} />
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Apellido:</Label>
                        <input value={formData.guest.last_name} name="guest.last_name" onChange={handleInputChange} style={{ borderRadius: '10px', border: 'none' }} />
                    </InputWrapper>


                    <Label mr="0.5rem" ml="3rem" style={{ marginTop: '13px' }}>Habitación</Label>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Número:</Label>
                        <input value={formData.room.number} name="room.number" onChange={handleInputChange} style={{ borderRadius: '10px', border: 'none' }} />
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Tipo:</Label>
                        <input value={formData.room.type} style={{ borderRadius: '10px', border: 'none' }}></input>
                    </InputWrapper>


                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Peticiones:</Label>
                        <TextArea
                            name="special_request"
                            value={formData.special_request}
                            onChange={handleChange}
                        />
                    </InputWrapper>

                    <SubmitButtonWrapper>
                        <ButtonForm type="submit" onClick={handleSubmit} style={{ marginRight: '13px', border: "none" }}>Guardar</ButtonForm>
                        <ButtonForm type="button" onClick={() => navigate('/bookings')} style={{ marginRight: '13px', border: "none" }}>Cancelar</ButtonForm>
                    </SubmitButtonWrapper>
                </FormColumn>
            </Card2>

        </>
    );
};
