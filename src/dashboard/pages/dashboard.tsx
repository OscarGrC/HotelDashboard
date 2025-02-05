import { Kpi } from "../components/kpi.tsx"
import { ContactCarousel } from "../../contact/components/contactCarousel.js";
import React, { useState, useEffect } from 'react';
import contactData from '../../contact/data/contact.json';
import { ContactApi } from "../../contact/interfaces/ContactApi.js";
export const Dashboard = () => {
    const [messages, setMessages] = useState<ContactApi[] | []>([]);
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