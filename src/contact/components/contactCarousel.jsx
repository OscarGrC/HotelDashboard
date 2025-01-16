import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css';
import { ContactCard } from './contactCard.jsx';
import { PopupOverlay, PopupContent, CloseButtonContainer } from './contactCard.js';
import { IoMdCloseCircle } from "react-icons/io";

export const ContactCarousel = ({ messages }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const openPopup = (message) => {
        setSelectedMessage(message);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMessage(null);
    };

    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                scrollbar={{ draggable: true }}
            >
                {messages.map((message, index) => (
                    <SwiperSlide onClick={() => openPopup(message)} key={index}>
                        <ContactCard item={message} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {showPopup && selectedMessage ? (
                <PopupOverlay onClick={closePopup}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedMessage.customer.name} {selectedMessage.customer.last_name}</h2>
                        <p>{selectedMessage.comment}</p>
                        <CloseButtonContainer>
                            <IoMdCloseCircle onClick={closePopup} style={{ fontSize: '30px', color: 'red' }} />
                        </CloseButtonContainer>
                    </PopupContent>
                </PopupOverlay>
            ) : null}
        </div>
    );
};


