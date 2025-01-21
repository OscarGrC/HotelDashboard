import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Header, Table, Pagination, ButtonStyled, ButtonItem } from '../../rooms/pages/rooms.js';
import { TabContainer, Tab } from '../../booking/pages/booking.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setSelectedUser, deleteUser } from '../../users/features/userSlice';
import { fetchUsersListThunk } from "../../users/features/userThunks.js"
export const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users.usersData);
    const status = useSelector((state) => state.users.status);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const UsersPerPage = 10;
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsersListThunk());
        }
        console.log(users)
    }, [status]);

    useEffect(() => {
        let filteredData = [...users];

        if (filter === "active") {
            filteredData = filteredData.filter((user) => user.stade === true);
        } else if (filter === "inactive") {
            filteredData = filteredData.filter((user) => user.stade === false);
        }

        setFilteredUsers(filteredData);
    }, [users, filter]);

    const indexOfLastUser = currentPage * UsersPerPage;
    const indexOfFirstUser = indexOfLastUser - UsersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        dispatch(setSelectedUser(user));
        navigate(`/users/edit/${user.id}`);
    };

    const handleViewDetails = (user) => {
        dispatch(setSelectedUser(user));
        navigate(`/users/details/${user.id}`);
    };

    return (
        <Wrapper>
            <Header>
                <TabContainer>
                    <Tab selected={filter === 'all'} onClick={() => setFilter('all')}>All Employees</Tab>
                    <Tab selected={filter === 'active'} onClick={() => setFilter('active')}>Active</Tab>
                    <Tab selected={filter === 'inactive'} onClick={() => setFilter('inactive')}>Inactive</Tab>
                </TabContainer>

                <button onClick={() => navigate("/users/create")}>+ New Employee</button>
            </Header>

            <DragDropContext>
                <Droppable droppableId="EmployeeTable">
                    {(provided) => (
                        <Table ref={provided.innerRef} {...provided.droppableProps}>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Start Date</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <Draggable key={user.email} draggableId={user.email} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => handleViewDetails(user)}>
                                                <td>
                                                    <img src={user.photo} alt="User" style={{ width: "4.8rem", height: "4.8rem" }} />
                                                </td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.startDate}</td>
                                                <td>{user.description}</td>
                                                <td>
                                                    <ButtonStyled type={user.stade ? "true" : "false"}>
                                                        {user.stade ? "Active" : "Inactive"}
                                                    </ButtonStyled>
                                                </td>
                                                <td className="actions">
                                                    <ButtonItem className="edit" onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(user);
                                                    }}><FaRegEdit /></ButtonItem>
                                                    <ButtonItem
                                                        className="delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(user.id);
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
                <button onClick={nextPage} disabled={indexOfLastUser >= filteredUsers.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
};
