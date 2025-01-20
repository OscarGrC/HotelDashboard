import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderWrapper, HamburgerIcon, PageTitle, IconsWrapper, NotificationBadge } from './Header.js';
import { FaRegBell, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import contactData from '../../contact/data/contact.json';

const HeaderBar = ({ onToggleSidebar, isSidebarVisible }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const totalMessages = contactData.length;
        setMessages(totalMessages);
    }, []);
    const pageTitles = {
        '/': 'Dashboard',
        '/bookings': 'Bookings',
        '/rooms/': 'Room List',
        '/rooms/create': 'Room Create',
        '/rooms/edit': 'Room edit',
        '/rooms/detail': 'Room detail',
        '/users/': 'Users',
        '/contact/': 'Contact',
        '/bookings/': 'Bookings',
        '/bookings/edit': 'Booking edit',
        '/bookings/create': 'Booking create'
    };

    let currentTitle = 'Page Not Found';

    switch (true) {
        case location.pathname.includes('/rooms/edit'):
            currentTitle = 'Room edit';
            break;
        case location.pathname.includes('/rooms/detail'):
            currentTitle = 'Room detail';
            break;
        case location.pathname.includes('/bookings/edit'):
            currentTitle = 'Booking edit';
            break;
        case location.pathname.includes('/bookings/create'):
            currentTitle = 'Booking create';
            break;
        case location.pathname.includes('/users/edit'):
            currentTitle = 'Users edit';
            break;
        case location.pathname.includes('/users/create'):
            currentTitle = 'Users create';
            break;
        case location.pathname.includes('/users/details'):
            currentTitle = 'Users details';
            break;
        default:
            currentTitle = pageTitles[location.pathname] || currentTitle;
            break;
    }


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
                    <NotificationBadge bgcolor="red">{messages}</NotificationBadge>
                </div>
                <div style={{ position: 'relative' }}>
                    <FaRegBell />
                    <NotificationBadge bgcolor="red">8</NotificationBadge>
                </div>
                <FiLogIn onClick={handleLogout} style={{ marginBottom: '0.4rem' }} />

            </IconsWrapper>

        </HeaderWrapper>
    );
};

export default HeaderBar;
