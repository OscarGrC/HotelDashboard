import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination } from '../../common/style/CommonStyles.js';
import { ButtonStyled } from "../../common/style/buttons"
import { TabContainer, Tab } from '../../booking/pages/booking.js';
import { ContactCarousel } from '../components/contactCarousel.jsx';
import { fetchContactListThunk, fetchContactArchivedListThunk, archiveContactThunk } from "../../contact/features/contactThunks.js";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.js';
import { ContactApi } from '../interfaces/ContactApi.js';

export const Contact = () => {
    const [currentTab, setCurrentTab] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const MessagesPerPage = 10;
    const dispatch: AppDispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contactData);
    const status = useSelector((state: RootState) => state.contacts.status);
    const contactsArchived = useSelector((state: RootState) => state.contacts.contactArchivedData);
    const statusArchived = useSelector((state: RootState) => state.contacts.statusArchived);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContactListThunk());
        }
        if (statusArchived === 'idle') {
            dispatch(fetchContactArchivedListThunk());
        }
    }, [dispatch, status, statusArchived]);

    const archiveMessage = (msg: ContactApi) => {
        dispatch(archiveContactThunk(msg));
    };

    const currentData = currentTab === 'all' ? contacts : contactsArchived;
    const sortedData = [...currentData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const indexOfLastMessage = currentPage * MessagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - MessagesPerPage;
    const currentMessages = sortedData.slice(indexOfFirstMessage, indexOfLastMessage);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    return (
        <Wrapper>
            <ContactCarousel messages={contacts}></ContactCarousel>
            <Header>
                <TabContainer>
                    <Tab selected={currentTab === 'all'} onClick={() => setCurrentTab('all')}>All</Tab>
                    <Tab selected={currentTab === 'archived'} onClick={() => setCurrentTab('archived')}>Archived</Tab>
                </TabContainer>
            </Header>

            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Comment</th>
                        {currentTab === 'all' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentMessages.map((msg) => (
                        <tr key={msg.id}>
                            <td>
                                <div>{msg.date.split("T").join(" ")}</div>
                                <div>ID: {msg.id}</div>
                            </td>
                            <td>
                                <div>{`${msg.customer.name} ${msg.customer.last_name}`}</div>
                                <div>{msg.customer.email}</div>
                                <div>{msg.customer.phone}</div>
                            </td>
                            <td>{msg.asunto}</td>
                            <td>{msg.comment}</td>
                            {currentTab === 'all' && (
                                <td>
                                    <ButtonStyled stade={false} onClick={() => archiveMessage(msg)}>Archived</ButtonStyled>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={indexOfLastMessage >= currentData.length}>
                    Next
                </button>
            </Pagination>
        </Wrapper>
    );
};
