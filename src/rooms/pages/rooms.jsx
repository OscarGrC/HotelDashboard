import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination, ButtonStyled } from './rooms.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import roomData from '../data/rooms.json';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const roomsPerPage = 10;
    useEffect(() => {
        setRooms(roomData);
    }, []);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const sortRooms = (key) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);

        const sortedRooms = [...rooms].sort((a, b) => {
            if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
            return 0;
        });

        setRooms(sortedRooms);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedRooms = Array.from(rooms);
        const [removed] = reorderedRooms.splice(result.source.index, 1);
        reorderedRooms.splice(result.destination.index, 0, removed);

        setRooms(reorderedRooms);
    };
    const calculateDiscountedPrice = (price, discountPercent) => {
        const discountedPrice = price - (price * discountPercent / 100);
        return parseFloat(discountedPrice.toFixed(2));
    };
    const amenitiesMap = {
        1: "Wi-Fi",
        2: "A/C",
        3: "Televisión",
        4: "Mini Bar",
        5: "Cama King Size",
        6: "Escritorio de trabajo",
        7: "Caja de seguridad",
        8: "Servicio de habitaciones",
        9: "Bañera",
        10: "Terraza privada",
    };
    const getAmenities = (amenities) => {
        return amenities
            .map((number) => amenitiesMap[number])
            .filter((service) => service)
            .join(', ');
    };

    return (
        <Wrapper>
            <Header>
                <button>+ New Room</button>
            </Header>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="roomsTable">
                    {(provided) => (
                        <Table ref={provided.innerRef} {...provided.droppableProps}>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th onClick={() => sortRooms('room_number')}>Room Number</th>
                                    <th onClick={() => sortRooms('room_type')}>Room Type</th>
                                    <th>Amenities</th>
                                    <th onClick={() => sortRooms('price')}>Price</th>
                                    <th onClick={() => sortRooms('offert_price')}>Offert Price</th>
                                    <th onClick={() => sortRooms('status')}>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room, index) => (
                                    <Draggable key={room.id} draggableId={room.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <td>
                                                    <img src={room.photos[0]} style={{ width: '9.375rem', height: '9.375rem' }} alt={`Room ${room.room_number}`} />
                                                </td>
                                                <td>{room.room_number}</td>
                                                <td>{room.room_type}</td>
                                                <td style={{ maxWidth: '7rem' }}>{getAmenities(room.amenities)}</td>
                                                <td>${room.price}</td>
                                                <td>${calculateDiscountedPrice(room.price, room.offert_price)}</td>
                                                <td><ButtonStyled type={room.status}>{room.status ? 'Available' : 'Unavailable'}</ButtonStyled></td>
                                                <td className="actions">
                                                    <button className="edit"><FaRegEdit /></button>
                                                    <button className="delete"><MdDelete /></button>
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
                <button onClick={nextPage} disabled={indexOfLastRoom >= rooms.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
}