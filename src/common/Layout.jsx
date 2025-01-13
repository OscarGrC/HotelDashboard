import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "./header/Header.jsx";
import Navbar from "./navbar/Navbar.jsx";
import "./Layout.css";

export const Layout = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    return (
        <div className={`layout ${isSidebarVisible ? "" : "sidebar-hidden"}`}>
            {isSidebarVisible && <Navbar />}
            <div className="main">
                <HeaderBar onToggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
