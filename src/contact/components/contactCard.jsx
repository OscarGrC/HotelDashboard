import React from 'react';
import { CardContainer, CommentText, Footer, CustomerInfo } from './contactCard.js';
import { MdBlock } from "react-icons/md";
export const ContactCard = ({ item }) => {
    if (!item) {
        return <div>No data available</div>;
    }
    const truncatedComment = item.comment.length > 100 ? `${item.comment.substring(0, 100)}...` : item.comment;

    const calculateTimeSince = (dateString) => {
        const formattedDateString = dateString.replace('TT', ' ');
        const messageDate = new Date(formattedDateString);
        if (isNaN(messageDate.getTime())) {
            return 'Invalid date';
        }
        const now = new Date();
        const diffInMs = now - messageDate;
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



    return (
        <CardContainer>
            <CommentText>{truncatedComment}</CommentText>
            <Footer>
                <CustomerInfo>
                    <div className="name">{`${item.customer.name} ${item.customer.last_name}`}</div>
                    <div className="time">{calculateTimeSince(item.date)}</div>
                </CustomerInfo>
                <MdBlock style={{ color: 'red', fontSize: '24px', marginTop: '10px' }} />
            </Footer>
        </CardContainer>
    );
};

export default ContactCard;
