import React from 'react';
import {
    SidebarWrapper,
    Header,
    LogoIcon,
    Title,
    Subtitle,
    Nav,
    NavItem,
    UserProfile,
    ContactSection,
    Footer
} from './Navbar';
import { FaHome, FaBed, FaUsers, FaCalendarAlt, FaEnvelope, FaHeart } from 'react-icons/fa';
import userAvatar from '../../assets/morty.png';

const Navbar = () => {
    return (
        <SidebarWrapper>

            <Header>
                <LogoIcon>🏨</LogoIcon>
                <Title>Travl</Title>
                <Subtitle>Hotel Admin Dashboard</Subtitle>
            </Header>

            <Nav>
                <NavItem>
                    <FaHome />
                    Home
                </NavItem>
                <NavItem>
                    <FaBed />
                    Rooms
                </NavItem>
                <NavItem>
                    <FaUsers />
                    Users
                </NavItem>
                <NavItem>
                    <FaCalendarAlt />
                    Bookings
                </NavItem>
                <NavItem>
                    <FaEnvelope />
                    Messages
                </NavItem>
            </Nav>

            <UserProfile>
                <img src={userAvatar} alt="User Avatar" />
                <h3>Oscar Gracia</h3>
                <p>oscar.gracia@example.com</p>
            </UserProfile>

            <ContactSection>
                <h4>Contact Us</h4>
            </ContactSection>

            <Footer>
                <p>Travl Hotel Admin Dashboard</p>
                <p>© 2025 All Rights Reserved</p>
                <p>
                    Made with <FaHeart /> by Oscar Gracia
                </p>
            </Footer>
        </SidebarWrapper>
    );
};

export default Navbar;
