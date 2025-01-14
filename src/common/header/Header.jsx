import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderWrapper, HamburgerIcon, PageTitle, IconsWrapper, NotificationBadge } from './Header.js';
import { FaRegBell, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";


const HeaderBar = ({ onToggleSidebar, isSidebarVisible }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const pageTitles = {
        '/': 'Dashboard',
        '/bookings': 'Bookings',
        '/Rooms': 'Rooms',
        '/users': 'Users',
        '/contact': 'Contact',
    };

    const currentTitle = pageTitles[location.pathname] || 'Page Not Found';

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <HeaderWrapper>
            <div>
                <HamburgerIcon onClick={onToggleSidebar}>
                    {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
                </HamburgerIcon>
                <PageTitle>{currentTitle}</PageTitle>
            </div>

            <IconsWrapper>
                <div style={{ position: 'relative' }}>
                    <MdOutlineEmail />
                    <NotificationBadge bgcolor="red">2</NotificationBadge>
                </div>
                <div style={{ position: 'relative' }}>
                    <FaRegBell />
                    <NotificationBadge bgcolor="red">87</NotificationBadge>
                </div>
                <FiLogIn onClick={handleLogout} style={{ marginBottom: '0.4rem' }} />

            </IconsWrapper>

        </HeaderWrapper>
    );
};

export default HeaderBar;
