import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setSelectedBooking } from '../../booking/features/bookingSlice.js';
import { fetchBookingListThunk, deleteBookingThunk } from "../../booking/features/bookingThunks.js"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ShearchBo, TabContainer, Tab } from './booking.js'
import { ButtonModelsHeader, ButtonTable, ButtonItem } from "../../common/style/buttons.js"
import { Wrapper, Header, Table, Pagination } from '../../common/style/CommonStyles.js';
export const Bookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookings = useSelector((state) => state.bookings.bookingData);
    const status = useSelector((state) => state.bookings.fetchStatus);

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const BookingPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBookingListThunk());
        }
    }, [status]);


    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    useEffect(() => {
        let filteredData = [...bookings];

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

    }, [bookings, filter, searchTerm]);


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
    const handleDelete = (booking) => {
        dispatch(deleteBookingThunk(booking));
    };
    const handleEdit = (booking) => {
        dispatch(setSelectedBooking(booking));
        navigate(`/bookings/edit/${booking.guest.id}`);
    };
    const handleViewDetails = (booking) => {
        dispatch(setSelectedBooking(booking));
        navigate(`/bookings/details/${booking.guest.id}`);
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



                <ButtonModelsHeader onClick={() => navigate("/bookings/create")}>+ New Booking</ButtonModelsHeader>

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
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleViewDetails(booking)}>
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
                                                    <ButtonTable status={getStatus(booking.check_in, booking.check_out)}>
                                                        {getStatus(booking.check_in, booking.check_out)}
                                                    </ButtonTable>
                                                </td>
                                                <td className="actions">
                                                    <ButtonItem className="edit" onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(booking);
                                                    }}><FaRegEdit /></ButtonItem>
                                                    <ButtonItem
                                                        className="delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(booking);
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

