// Header.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    HeaderWrapper,
    HamburgerIcon,
    PageTitle,
    SearchBar,
    SearchInput,
    SearchButton,
    IconsWrapper,
    UserAvatar,
    LanguageSelector, NotificationBadge
} from './Header.js';
import { FaSearch, FaRegHeart, FaRegBell, FaBars, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";

import mortyImage from '../../assets/morty.png';

const HeaderBar = ({ onToggleSidebar, isSidebarVisible }) => {
    const location = useLocation();

    const pageTitles = {
        '/': 'Dashboard',
        '/bookings': 'Bookings',
        '/rooms': 'Rooms',
        '/users': 'Users',
        '/contact': 'Contact',
    };

    const currentTitle = pageTitles[location.pathname] || 'Page Not Found';

    return (
        <HeaderWrapper>
            <HamburgerIcon onClick={onToggleSidebar}>
                {isSidebarVisible ? <FaArrowLeft /> : <FaBars />}
            </HamburgerIcon>
            <PageTitle>{currentTitle}</PageTitle>
            <SearchBar>
                <SearchInput placeholder="Search..." />
                <SearchButton>
                    <FaSearch />
                </SearchButton>
            </SearchBar>
            <IconsWrapper>
                <FaRegHeart />
                <div style={{ position: 'relative' }}>
                    <MdOutlineEmail />
                    <NotificationBadge bgColor="red">2</NotificationBadge>
                </div>
                <div style={{ position: 'relative' }}>
                    <FaRegBell />
                    <NotificationBadge bgColor="red">87</NotificationBadge>
                </div>
                <div style={{ position: 'relative' }}>
                    <MdOutlineChat />
                    <NotificationBadge bgColor="black">!</NotificationBadge>
                </div>
            </IconsWrapper>
            <UserAvatar src={mortyImage} alt="User Avatar" />
            <LanguageSelector defaultValue="en">
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
            </LanguageSelector>
        </HeaderWrapper>
    );
};

export default HeaderBar;
