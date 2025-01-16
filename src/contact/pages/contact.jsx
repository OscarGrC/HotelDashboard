import React, { useState, useEffect } from 'react';
import { Wrapper, Header, Table, Pagination, ButtonStyled } from '../../rooms/pages/rooms.js';
import { TabContainer, Tab } from '../../booking/pages/booking.js';
import contactData from '../data/contact.json';
import contactArchivedData from '../data/contactArchived.json';
import { ContactCarousel } from '../components/contactCarousel.jsx';

export const Contact = () => {
    const [messages, setMessages] = useState([]);
    const [archivedMessages, setArchivedMessages] = useState([]);
    const [currentTab, setCurrentTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const MessagesPerPage = 10;


    useEffect(() => {
        setMessages(contactData);
        setArchivedMessages(contactArchivedData);
    }, []);

    const archiveMessage = (id) => {
        const messageToArchive = messages.find((msg) => msg.id === id);
        if (messageToArchive) {
            setMessages(messages.filter((msg) => msg.id !== id));
            setArchivedMessages([...archivedMessages, messageToArchive]);
        }
    };

    const currentData = currentTab === 'all' ? messages : archivedMessages;
    const sortedData = [...currentData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const indexOfLastMessage = currentPage * MessagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - MessagesPerPage;
    const currentMessages = sortedData.slice(indexOfFirstMessage, indexOfLastMessage);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => prev - 1);

    return (
        <Wrapper>
            <ContactCarousel messages={messages}></ContactCarousel>
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
                                    <ButtonStyled onClick={() => archiveMessage(msg.id)}>Archived</ButtonStyled>
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
