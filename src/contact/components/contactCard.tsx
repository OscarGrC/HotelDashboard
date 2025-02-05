import React from 'react';
import { CardContainer, CommentText, Footer, CustomerInfo } from './contactCard.ts';
import { MdBlock } from "react-icons/md";
import { archiveContactThunk } from "../features/contactThunks.ts";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { ContactApi } from '../interfaces/ContactApi.ts';

export const ContactCard = ({ item }) => {
    const dispatch: AppDispatch = useDispatch();

    if (!item) {
        return <div>No data available</div>;
    }

    const truncatedComment = item.comment.length > 100 ? `${item.comment.substring(0, 100)}...` : item.comment;

    const calculateTimeSince = (dateString: string) => {
        const formattedDateString = dateString.replace('TT', ' ');
        const messageDate = new Date(formattedDateString);
        if (isNaN(messageDate.getTime())) {
            return 'Invalid date';
        }
        const now = new Date();
        const diffInMs = now.getTime() - messageDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        } else {
            return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
        }
    };

    const archiveMessage = (msg: ContactApi) => {
        dispatch(archiveContactThunk(msg));
    };

    return (
        <CardContainer style={{ cursor: 'pointer' }}>
            <CommentText>{truncatedComment}</CommentText>
            <Footer>
                <CustomerInfo>
                    <div className="name">{`${item.customer.name} ${item.customer.last_name}`}</div>
                    <div className="time">{calculateTimeSince(item.date)}</div>
                </CustomerInfo>

                <MdBlock
                    style={{ color: 'red', fontSize: '24px', marginTop: '10px' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        archiveMessage(item);
                    }}
                />
            </Footer>
        </CardContainer>
    );
};
