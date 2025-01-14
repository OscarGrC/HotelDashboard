import React, { useEffect, useState } from 'react';
import { SidebarWrapper, Header, LogoIcon, Title, Subtitle, Nav, NavItem, UserProfile, ContactButton, TitleContainer, Footer } from './Navbar';
import { FaHome, FaBed, FaUsers, FaCalendarAlt, FaHeart, FaBook } from 'react-icons/fa';
import userAvatar from '../../assets/morty.png';
import logoImage from '../../assets/hotel.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

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
                <NavItem onClick={() => navigate("/Bookings/")} className={activePath.startsWith('/Bookings/') ? "navActive" : ""}>
                    <FaBook />
                    Bookings
                </NavItem>
                <NavItem onClick={() => navigate("/Rooms/")} className={activePath.startsWith('/Rooms/') ? "navActive" : ""}>
                    <FaBed />
                    Rooms
                </NavItem>
                <NavItem>
                    <FaUsers />
                    Contact
                </NavItem>
                <NavItem>
                    <FaCalendarAlt />
                    Users
                </NavItem>
            </Nav>

            <UserProfile>
                <img src={userAvatar} alt="User Avatar" />
                <h3>Oscar Gracia</h3>
                <p>oscar.gracia@example.com</p>
            </UserProfile>

            <ContactButton>Editar</ContactButton>

            <Footer>
                <h4>Travl Hotel Admin Dashboard</h4>
                <p>© 2025 All Rights Reserved</p>
                <h3> Made with <FaHeart /> by Oscar Grace</h3>
            </Footer>
        </SidebarWrapper>
    );
};

export default Navbar;
