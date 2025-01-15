import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination, ButtonBooking } from '../../rooms/pages/rooms.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import bookingData from '../data/booking.json';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Bookings = () => {
    const [bookings, setBookings] = useState([]); // Renombrado de `booking` a `bookings` para reflejar que es una lista
    const [currentPage, setCurrentPage] = useState(1);
    const BookingPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        setBookings(bookingData);
    }, [bookingData]);

    const indexOfLastBooking = currentPage * BookingPerPage;
    const indexOfFirstBooking = indexOfLastBooking - BookingPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const handleSpecialRequest = (specialRequest) => {
        alert(specialRequest);
    };

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const getStatus = (checkInDate, checkOutDate) => {
        const today = new Date();
        const checkIn = parseDate(checkInDate);
        const checkOut = parseDate(checkOutDate);

        if (today < checkIn) return 'Check In';
        if (today >= checkIn && today <= checkOut) return 'In Progress';
        if (today > checkOut) return 'Check Out';
    };

    return (
        <Wrapper>
            <Header>
                <button onClick={() => navigate("/Bookings/create")}>+ New Booking</button>
            </Header>
            <DragDropContext>
                <Droppable droppableId="bookingsTable">
                    {(provided) => (
                        <Table ref={provided.innerRef} {...provided.droppableProps}>
                            <thead>
                                <tr>
                                    <th>Guest</th>
                                    <th>Order Date</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Special Request</th>
                                    <th>Room Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBookings.map((booking, index) => ( // Cambié `room` a `booking`
                                    <Draggable key={booking.guest.id} draggableId={booking.guest.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <td>
                                                    {booking.guest.name} {booking.guest.last_name} <br />
                                                    ID: {booking.guest.id}
                                                </td>
                                                <td>{booking.order_date}</td>
                                                <td>{booking.check_in}</td>
                                                <td>{booking.check_out}</td>
                                                <td>
                                                    <button onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSpecialRequest(booking.special_request)
                                                    }}>
                                                        View Notes
                                                    </button>
                                                </td>
                                                <td>{booking.room.type} - {booking.room.number}</td>
                                                <td>
                                                    <ButtonBooking status={getStatus(booking.check_in, booking.check_out)}>
                                                        {getStatus(booking.check_in, booking.check_out)}
                                                    </ButtonBooking>
                                                </td>
                                                <td className="actions">
                                                    <button className="edit" onClick={() => navigate(`/Rooms/edit/${booking.guest.id}`)}><FaRegEdit /></button>
                                                    <button
                                                        className="delete"
                                                        onClick={() => {
                                                            const updatedBookings = bookings.filter((b) => b.guest.id !== booking.guest.id);
                                                            setBookings(updatedBookings);
                                                        }}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        </Table>
                    )}
                </Droppable>
            </DragDropContext>

            <Pagination>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={indexOfLastBooking >= bookings.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper >
    );
};

