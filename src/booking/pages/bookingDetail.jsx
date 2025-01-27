import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Title, Card2, InputWrapper, FormColumn, Label } from '../../common/style/FormStyles.js';

export const BookingDetails = () => {
    const selectedBooking = useSelector((state) => state.bookings.selectedBooking);

    const [bookingData, setBookingData] = useState({
        check_in: '',
        check_out: '',
        guest: { name: '', last_name: '', id: '' },
        order_date: '',
        room: { type: '', number: '' },
        special_request: ''
    });

    useEffect(() => {
        if (selectedBooking) {
            setBookingData({
                check_in: selectedBooking.check_in || '',
                check_out: selectedBooking.check_out || '',
                guest: selectedBooking.guest || { name: '', last_name: '', id: '' },
                order_date: selectedBooking.order_date || '',
                room: selectedBooking.room || { type: '', number: '' },
                special_request: selectedBooking.special_request || ''
            });
        }
    }, [selectedBooking]);

    return (
        <>
            <Title>Booking Details</Title>
            <Card2>
                <FormColumn>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Check-In:</Label>
                        <p>{bookingData.check_in}</p>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Check-Out:</Label>
                        <p>{bookingData.check_out}</p>
                    </InputWrapper>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Cliente:</Label>
                        <p>
                            {bookingData.guest.name} {bookingData.guest.last_name}
                        </p>
                    </InputWrapper>
                    <Label mr="0.5rem" ml="3rem" style={{ marginTop: '13px' }}>Habitacion</Label>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Numero:</Label>
                        <p>
                            {bookingData.room.number}
                        </p>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Tipo:</Label>
                        <p>
                            {bookingData.room.type}
                        </p>
                    </InputWrapper>
                    <InputWrapper>
                        <Label mr="0.5rem" ml="2rem" style={{ marginTop: '13px' }}>Peticiones:</Label>
                        <p>{bookingData.special_request}</p>
                    </InputWrapper>
                </FormColumn>
            </Card2>
        </>
    );
};
