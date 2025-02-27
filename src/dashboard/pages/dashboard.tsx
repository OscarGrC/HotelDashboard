import { Kpi } from "../components/kpi.tsx"
import { ContactCarousel } from "../../contact/components/contactCarousel.js";
import React, { useState, useEffect } from 'react';
import { ContactApi } from "../../contact/interfaces/ContactApi.js";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import ReactLoading from 'react-loading';
import { DivCenter } from "../../common/style/CommonStyles.ts";
import { fetchContactListThunk } from "../../contact/features/contactThunks.ts";

export const Dashboard = () => {
    const [messages, setMessages] = useState<ContactApi[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch: AppDispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contactData);
    const status = useSelector((state: RootState) => state.contacts.status);
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;
    const [retryCount, setRetryCount] = useState(0);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContactListThunk())
        }
        if (status === "fulfilled") {
            setLoading(false)

        }
        if (status === 'rejected' && retryCount < MAX_RETRIES) {
            const timeout = setTimeout(() => {
                setRetryCount(retryCount + 1);
                dispatch(fetchContactListThunk());
            }, RETRY_DELAY);

            return () => clearTimeout(timeout);
        }

    }, [status]);
    return loading ? (
        <DivCenter>
            <ReactLoading type="spinningBubbles" color="#12aac5" height={300} width={300} />
        </DivCenter>
    ) : (
        <div data-cy="div">
            <Kpi startDate="01/01/2025" endDate="16/01/2026"></Kpi>
            <ContactCarousel messages={contacts} ></ContactCarousel>
        </div>
    )
}