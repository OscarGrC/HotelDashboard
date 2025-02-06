import { Kpi } from "../components/kpi.tsx"
import { ContactCarousel } from "../../contact/components/contactCarousel.js";
import React, { useState, useEffect } from 'react';
import contactData from '../../contact/data/contact.json';
import { ContactApi } from "../../contact/interfaces/ContactApi.js";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import ReactLoading from 'react-loading';
import { DivCenter } from "../../common/style/CommonStyles.ts";

export const Dashboard = () => {
    const [messages, setMessages] = useState<ContactApi[] | []>([]);
    const status = useSelector((state: RootState) => state.contacts.status);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (status === 'idle') {
            setMessages(contactData);
        }
        if (status === "fulfilled") {
            setLoading(false)
        }
    }, [status]);
    return loading ? (
        <DivCenter>
            <ReactLoading type="spinningBubbles" color="#12aac5" height={300} width={300} />
        </DivCenter>
    ) : (
        <div data-cy="div">
            <Kpi startDate="01/01/2025" endDate="16/01/2026"></Kpi>
            <ContactCarousel messages={messages} ></ContactCarousel>
        </div>
    )
}