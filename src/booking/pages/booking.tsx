import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setSelectedBooking } from '../features/bookingSlice.js';
import { fetchBookingListThunk, deleteBookingThunk } from "../features/bookingThunks.js"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ShearchBo, TabContainer, Tab } from './booking.js'
import { ButtonModelsHeader, ButtonTable, ButtonItem } from "../../common/style/buttons.ts"
import { Wrapper, Header, Table, Pagination, DivCenter } from '../../common/style/CommonStyles.js';
import { AppDispatch, RootState } from '../../app/store.js';
import { BookingApiInterface } from '../interfaces/BookingApiInterface.js';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

export const Bookings = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const bookings = useSelector((state: RootState) => state.bookings.bookingData);
    const status = useSelector((state: RootState) => state.bookings.fetchStatus);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredBookings, setFilteredBookings] = useState<BookingApiInterface[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const BookingPerPage = 10;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBookingListThunk());
        }
        if (status === "fulfilled") {
            setLoading(false)
        }
    }, [status]);


    const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    useEffect(() => {
        let filteredData = [...bookings];

        if (filter === "checking_in") {
            filteredData = filteredData.sort((a, b) => parseDate(b.check_in).getTime() - parseDate(a.check_in).getTime());
        } else if (filter === "checking_out") {
            filteredData = filteredData.sort((a, b) => parseDate(a.check_out).getTime() - parseDate(b.check_out).getTime());
        } else if (filter === "in_progress") {
            filteredData = filteredData.filter((booking) => parseDate(booking.check_in) <= new Date() && parseDate(booking.check_out) >= new Date())
                .sort((a, b) => parseDate(b.order_date).getTime() - parseDate(a.order_date).getTime());
        } else {
            filteredData = filteredData.sort((a, b) => parseDate(b.order_date).getTime() - parseDate(a.order_date).getTime());
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

    const handleSpecialRequest = (specialRequest: string) => {
        alert(specialRequest);
    };

    const getStatus = (checkInDate: string, checkOutDate: string): string => {
        const today = new Date();
        const checkIn = parseDate(checkInDate);
        const checkOut = parseDate(checkOutDate);

        if (today < checkIn) return 'Check In';
        if (today >= checkIn && today <= checkOut) return 'In Progress';
        if (today > checkOut) return 'Check Out';

        return 'Unknown';
    };
    const handleDelete = (booking: number) => {
        dispatch(deleteBookingThunk(booking)).then(() => {
            toast.success('Eliminado con éxito', {
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
                toast.error('Hubo un error al Eliminar', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    const handleEdit = (booking: BookingApiInterface) => {
        dispatch(setSelectedBooking(booking));
        navigate(`/bookings/edit/${booking.guest.id}`);
    };
    const handleViewDetails = (booking: BookingApiInterface) => {
        dispatch(setSelectedBooking(booking));
        navigate(`/bookings/details/${booking.guest.id}`);
    };


    return loading ? (
        <DivCenter>
            <ReactLoading type="spinningBubbles" color="#12aac5" height={300} width={300} />
        </DivCenter>
    ) : (
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
                                                    <button onClick={(e) => { e.stopPropagation(); handleSpecialRequest(booking.special_request!) }}>
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
                                                            handleDelete(booking.guest.id);
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

