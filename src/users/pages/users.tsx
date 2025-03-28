import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper, Header, Table, Pagination, DivCenter } from '../../common/style/CommonStyles.js';
import { ButtonModelsHeader, ButtonStyled, ButtonItem } from "../../common/style/buttons.js"
import { TabContainer, Tab } from '../../booking/pages/booking.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../features/userSlice.js';
import { fetchUsersListThunk, deleteUserThunk } from "../features/userThunks.js"
import { IUserApi } from '../interfaces/IUserApi.js';
import { AppDispatch, RootState } from '../../app/store.js';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import morty from "../../assets/morty.png";

export const Users = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const users: IUserApi[] = useSelector((state: RootState) => state.users.usersData);
    let status: string = useSelector((state: RootState) => state.users.fetchStatus);
    const [filteredUsers, setFilteredUsers] = useState<IUserApi[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const UsersPerPage: number = 10;
    const [filter, setFilter] = useState<string>("all");
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;
    const [retryCount, setRetryCount] = useState(0);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsersListThunk());
        }
        if (status === "fulfilled") {
            setLoading(false)
            console.log(users)
        }
        if (status === 'rejected' && retryCount < MAX_RETRIES) {
            const timeout = setTimeout(() => {
                setRetryCount(retryCount + 1);
                dispatch(fetchUsersListThunk());
            }, RETRY_DELAY);

            return () => clearTimeout(timeout);
        }
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
    // mover paginacion a componente tabla 
    const indexOfLastUser = currentPage * UsersPerPage;
    const indexOfFirstUser = indexOfLastUser - UsersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const handleDelete = (userId: string) => {
        dispatch(deleteUserThunk(userId))
            .then(() => {
                toast.success('Eliminado con éxito', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                toast.error('Hubo un error al eliminar', {
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


    const handleEdit = (user: IUserApi) => {
        dispatch(setSelectedUser(user));
        navigate(`/users/edit/${user._id}`);
    };

    const handleViewDetails = (user: IUserApi) => {
        dispatch(setSelectedUser(user));
        navigate(`/users/details/${user}`);
    };

    return loading ? (
        <DivCenter>
            <ReactLoading type="spinningBubbles" color="#12aac5" height={300} width={300} />
        </DivCenter>
    ) : (

        <Wrapper>
            <Header>
                <TabContainer>
                    <Tab selected={filter === 'all'} onClick={() => setFilter('all')}>All Employees</Tab>
                    <Tab selected={filter === 'active'} onClick={() => setFilter('active')}>Active</Tab>
                    <Tab selected={filter === 'inactive'} onClick={() => setFilter('inactive')}>Inactive</Tab>
                </TabContainer>

                <ButtonModelsHeader onClick={() => navigate("/users/create")}>+ New Employee</ButtonModelsHeader>
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
                                                    <img src={morty} alt="User" style={{ width: "4.8rem", height: "4.8rem" }} />
                                                </td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.startDate}</td>
                                                <td>{user.description}</td>
                                                <td>
                                                    <ButtonStyled stade={user.stade}>
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
                                                            handleDelete(user._id);
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
