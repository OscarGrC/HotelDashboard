import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination, ButtonStyled } from '../../rooms/pages/rooms.js';
import { TabContainer, Tab } from '../../booking/pages/booking.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import usersData from '../../users/data/users.json';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const UsersPerPage = 10;
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        setUsers(usersData);
    }, []);

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
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => navigate(`details/${user.id}`)}>
                                                <td>
                                                    <img src={user.photo} alt="User" style={{ width: "4.8rem", height: "4.8rem" }}
                                                    />
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
                                                    <button className="edit" onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/users/edit/${user.id}`)
                                                    }}><FaRegEdit /></button>
                                                    <button
                                                        className="delete"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const updatedUsers = users.filter((u) => u.id !== user.id);
                                                            setUsers(updatedUsers);
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
                <button onClick={nextPage} disabled={indexOfLastUser >= filteredUsers.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
};
