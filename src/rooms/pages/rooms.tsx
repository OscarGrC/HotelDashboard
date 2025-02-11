import React, { useState, useEffect } from 'react';
import { ButtonModelsHeader, ButtonStyled, ButtonItem } from "../../common/style/buttons.js"
import { Wrapper, Header, Table, Pagination, DivCenter } from '../../common/style/CommonStyles.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoom } from '../features/roomSlice.js';
import { fetchRoomsListThunk, deleteRoomThunk } from "../features/roomThunks.js"
import { AppDispatch, RootState } from '../../app/store.js';
import { RoomApi } from '../interfaces/RoomApi.js';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

export const Rooms = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const rooms = useSelector((state: RootState) => state.rooms.roomsData);
    const status = useSelector((state: RootState) => state.rooms.fetchStatus);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const roomsPerPage = 10;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRoomsListThunk());
        }
        if (status === "fulfilled") {
            setLoading(false)
        }
    }, [status]);

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const handleDelete = (roomId: number) => {
        dispatch(deleteRoomThunk(roomId)).then(() => {
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
            });;
    };

    const handleEdit = (room: RoomApi) => {
        dispatch(setSelectedRoom(room));
        navigate(`/rooms/edit/${room.id}`);
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

    return loading ? (
        <DivCenter>
            <ReactLoading type="spinningBubbles" color="#12aac5" height={300} width={300} />
        </DivCenter>
    ) : (
        <Wrapper>
            <Header>
                <ButtonModelsHeader data-cy="create-submit" onClick={() => navigate("/rooms/create")}>+ New Room</ButtonModelsHeader>
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
                                                            handleEdit(room);
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
