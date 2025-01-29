import { Kpi } from "../components/kpi.jsx"
import { ContactCarousel } from "../../contact/components/contactCarousel.jsx";
import React, { useState, useEffect } from 'react';
import contactData from '../../contact/data/contact.json';
export const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages(contactData);
    }, []);
    return (
        <div data-cy="div">
            <Kpi startDate="01/01/2025" endDate="16/01/2026"></Kpi>
            <ContactCarousel messages={messages} ></ContactCarousel>
        </div>
    )
}