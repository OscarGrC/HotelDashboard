import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination, ButtonBooking, ButtonItem } from '../../rooms/pages/rooms.js';
import { ShearchBo, TabContainer, Tab } from './booking.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import bookingData from '../data/booking.json';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const BookingPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setBookings(bookingData);
    }, [bookingData]);


    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    useEffect(() => {
        let filteredData = [...bookingData];

        if (filter === "checking_in") {
            filteredData = filteredData.sort((a, b) => parseDate(b.check_in) - parseDate(a.check_in));
        } else if (filter === "checking_out") {
            filteredData = filteredData.sort((a, b) => parseDate(a.check_out) - parseDate(b.check_out));
        } else if (filter === "in_progress") {
            filteredData = filteredData.filter((booking) => parseDate(booking.check_in) <= new Date() && parseDate(booking.check_out) >= new Date())
                .sort((a, b) => parseDate(b.order_date) - parseDate(a.order_date));
        } else {
            filteredData = filteredData.sort((a, b) => parseDate(b.order_date) - parseDate(a.order_date));
        }
        if (searchTerm) {
            filteredData = filteredData.filter((booking) =>
                booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.guest.last_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBookings(filteredData);

    }, [bookingData, filter, searchTerm]);


    const indexOfLastBooking = currentPage * BookingPerPage;
    const indexOfFirstBooking = indexOfLastBooking - BookingPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const handleSpecialRequest = (specialRequest) => {
        alert(specialRequest);
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
                <TabContainer>
                    <Tab selected={filter === 'all'} onClick={() => setFilter('all')}>All Bookings</Tab>
                    <Tab selected={filter === 'checking_in'} onClick={() => setFilter('checking_in')}>Checking In</Tab>
                    <Tab selected={filter === 'checking_out'} onClick={() => setFilter('checking_out')}>Checking Out</Tab>
                    <Tab selected={filter === 'in_progress'} onClick={() => setFilter('in_progress')}>In Progress</Tab>
                    <div className="search">
                        <ShearchBo
                            type="text"
                            placeholder="Search by guest name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </TabContainer>



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
                                {currentBookings.map((booking, index) => (
                                    <Draggable key={booking.guest.id} draggableId={booking.guest.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => navigate(`/Bookings/details/${booking.guest.id}`)}>
                                                <td>
                                                    {booking.guest.name} {booking.guest.last_name} <br />
                                                    ID: {booking.guest.id}
                                                </td>
                                                <td>{booking.order_date}</td>
                                                <td>{booking.check_in}</td>
                                                <td>{booking.check_out}</td>
                                                <td>
                                                    <button onClick={(e) => { e.stopPropagation(); handleSpecialRequest(booking.special_request) }}>
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
                                                    <ButtonItem className="edit" onClick={() => navigate(`/Bookings/edit/${booking.guest.id}`)}><FaRegEdit /></ButtonItem>
                                                    <ButtonItem
                                                        className="delete"
                                                        onClick={() => {
                                                            const updatedBookings = bookings.filter((b) => b.guest.id !== booking.guest.id);
                                                            setBookings(updatedBookings);
                                                        }}
                                                    >
                                                        <MdDelete />
                                                    </ButtonItem>
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
                <button onClick={nextPage} disabled={indexOfLastBooking >= filteredBookings.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
};

