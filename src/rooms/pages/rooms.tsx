import React, { useState, useEffect } from 'react';
import { ButtonModelsHeader, ButtonStyled, ButtonItem } from "../../common/style/buttons.js"
import { Wrapper, Header, Table, Pagination } from '../../common/style/CommonStyles.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoom } from '../features/roomSlice.js';
import { fetchRoomsListThunk, deleteRoomThunk } from "../features/roomThunks.js"
import { AppDispatch, RootState } from '../../app/store.js';
import { RoomApi } from '../interfaces/RoomApi.js';

export const Rooms = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state: RootState) => state.rooms.roomsData);
    const status = useSelector((state: RootState) => state.rooms.fetchStatus);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const roomsPerPage = 10;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRoomsListThunk());
        }
    }, [status]);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const handleDelete = (roomId: number) => {
        dispatch(deleteRoomThunk(roomId));
    };

    const handleEdit = (roomId: number) => {
        dispatch(setSelectedRoom(roomId));
        navigate(`/rooms/edit/${roomId}`);
    };

    const handleViewDetails = (room: RoomApi) => {
        dispatch(setSelectedRoom(room));
        navigate(`/rooms/details/${room.id}`);
    };

    const calculateDiscountedPrice = (price: number, discountPercent: number): number => {
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

    const getAmenities = (amenities: number[]) => {
        return amenities
            .map((number) => amenitiesMap[number])
            .filter((service) => service)
            .join(', ');
    };

    return (
        <Wrapper>
            <Header>
                <ButtonModelsHeader data-cy="create-submit" onClick={() => navigate("/Rooms/create")}>+ New Room</ButtonModelsHeader>
            </Header>

            <DragDropContext onDragEnd={(result) => { }}>
                <Droppable droppableId="roomsTable">
                    {(provided) => (
                        <Table ref={provided.innerRef} {...provided.droppableProps}>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Room Number</th>
                                    <th>Room Type</th>
                                    <th>Amenities</th>
                                    <th>Price</th>
                                    <th>Offert Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room, index) => (
                                    <Draggable key={room.id} draggableId={room.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => handleViewDetails(room)}
                                            >
                                                <td>
                                                    <img src={room.photos[0]} alt={`Room ${room.room_number}`} />
                                                </td>
                                                <td>{room.room_number}</td>
                                                <td>{room.room_type}</td>
                                                <td>{getAmenities(room.amenities)}</td>
                                                <td>${room.price}</td>
                                                <td>${calculateDiscountedPrice(room.price, room.offert_price)}</td>
                                                <td><ButtonStyled stade={room.status}>{room.status ? 'Available' : 'Booked'}</ButtonStyled></td>
                                                <td className="actions">
                                                    <ButtonItem
                                                        className="edit"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(room.id);
                                                        }}
                                                    >
                                                        <FaRegEdit />
                                                    </ButtonItem>
                                                    <ButtonItem
                                                        className="delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(room.id);
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
                <button onClick={nextPage} disabled={indexOfLastRoom >= rooms.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
};
