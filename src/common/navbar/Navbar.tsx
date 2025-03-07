import React, { useState, useContext, useEffect } from 'react';
import { SidebarWrapper, Header, LogoIcon, Title, Subtitle, Nav, NavItem, UserProfile, ContactButton, TitleContainer, Footer } from './Navbar.js';
import { FaHome, FaBed, FaUsers, FaCalendarAlt, FaHeart, FaBook } from 'react-icons/fa';
import userAvatar from '../../assets/morty.png';
import logoImage from '../../assets/hotel.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../login/AuthContext.jsx';
import { Button, Input, Label, Form, ModalContent, ModalOverlay } from './modalStyle.js'
import { AppDispatch } from '../../app/store.js';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useContext(AuthContext);

    const dispatch: AppDispatch = useDispatch();
    const [activePath, setActivePath] = useState<string>(location.pathname);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [name, setName] = useState(state.user.name);
    const [email, setEmail] = useState(state.user.email);

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])


    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleSave = () => {
        dispatch({
            type: 'updateUser',
            payload: { name, email },
        });
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <SidebarWrapper>
            <Header>
                <LogoIcon>
                    <img src={logoImage} alt="Hotel Logo" />
                </LogoIcon>
                <TitleContainer>
                    <Title>Travl</Title>
                    <Subtitle>Hotel Admin Dashboard</Subtitle>
                </TitleContainer>
            </Header>

            <Nav>
                <NavItem onClick={() => navigate("/")} className={activePath === "/" ? "navActive" : ""}>
                    <FaHome />
                    Dashboard
                </NavItem>
                <NavItem onClick={() => navigate("/bookings/")} className={activePath.startsWith('/bookings/') ? "navActive" : ""}>
                    <FaBook />
                    Bookings
                </NavItem>
                <NavItem onClick={() => navigate("/rooms/")} className={activePath.startsWith('/rooms/') ? "navActive" : ""}>
                    <FaBed />
                    Rooms
                </NavItem>
                <NavItem onClick={() => navigate("/contact/")} className={activePath.startsWith('/contact/') ? "navActive" : ""}>
                    <FaUsers />
                    Contact
                </NavItem>
                <NavItem onClick={() => navigate("/users/")} className={activePath.startsWith('/users/') ? "navActive" : ""}>
                    <FaCalendarAlt />
                    Users
                </NavItem>
            </Nav>

            <UserProfile>
                <img src={userAvatar} alt="User Avatar" />
                <h3>{state.user.name}</h3>
                <p>{state.user.email}</p>
            </UserProfile>

            <ContactButton onClick={handleEditClick}>Editar</ContactButton>


            {isModalOpen ? (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Editar Perfil</h2>
                        <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <Label>Nombre</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Label>Correo Electrónico</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button tipo="save">Guardar Cambios</Button>
                            <Button tipo="exit" className="close" onClick={handleCloseModal}>Cerrar</Button>
                        </Form>
                    </ModalContent>
                </ModalOverlay>
            ) : <></>}

            <Footer>
                <h4>Travl Hotel Admin Dashboard</h4>
                <p>© 2025 All Rights Reserved</p>
                <h3> Made with <FaHeart /> by Oscar Grace</h3>
            </Footer>
        </SidebarWrapper>
    );
};

export default Navbar;
