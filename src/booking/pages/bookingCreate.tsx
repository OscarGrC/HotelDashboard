import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBookingThunk } from '../features/bookingThunks';
import { Title, Card2, InputWrapper, FormColumn, Label, SubmitButtonWrapper, TextArea } from '../../common/style/FormStyles';
import { ButtonForm } from "../../common/style/buttons"
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { BookingApiInterface } from '../interfaces/BookingApiInterface';
import { RoomType } from '../../rooms/interfaces/RoomTypeEnum';
import { toast } from 'react-toastify';

export const BookingCreate = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const rooms = useSelector((state: RootState) => state.rooms.roomsData);

    const DateNow = (): string => {
        const date = new Date().toISOString().split("T")[0]
        return date
    }

    const [formData, setFormData] = useState({
        check_in: '',
        check_out: '',
        order_date: DateNow(),
        guest: { name: '', last_name: '', id: 0 },
        room: { type: '', number: '' },
        special_request: ''
    });


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const parseDateBack = (dateString) => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const originalFormat = format(formData);
        dispatch(addBookingThunk(originalFormat)).then(() => {
            toast.success('Creado con éxito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
            .catch((error) => {
                toast.error('Hubo un error al crear', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        navigate("/bookings/");
    };

    const format = (formData: Partial<BookingApiInterface>): BookingApiInterface => {
        return {
            check_in: parseDateBack(formData.check_in || ''),
            check_out: parseDateBack(formData.check_out || ''),
            guest: {
                name: formData.guest?.name || '',
                last_name: formData.guest?.last_name || '',
                id: formData.guest?.id || 0,
            },
            room: {
                type: formData.room?.type || '',
                number: formData.room?.number || '',
            },
            special_request: formData.special_request || '',
            order_date: formData.order_date || '',
        };
    };



    const handleInputChange = (e: any) => {
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
            <Title>Booking Create</Title>
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
                        <select
                            value={formData.room.type}
                            onChange={(e) => setFormData({
                                ...formData,
                                room: {
                                    ...formData.room,
                                    type: e.target.value
                                }
                            })}
                            style={{ borderRadius: '10px', border: 'none', padding: '5px' }}
                        >
                            {Object.values(RoomType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
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
