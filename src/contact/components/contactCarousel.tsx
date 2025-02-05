import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css';
import { ContactCard } from './contactCard.tsx';
import { PopupOverlay, PopupContent, CloseButtonContainer } from './contactCard.ts';
import { IoMdCloseCircle } from "react-icons/io";
import { ContactApi } from '../interfaces/ContactApi.ts';

export const ContactCarousel = ({ messages }) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedMessage, setSelectedMessage] = useState<ContactApi | null>(null);

    const openPopup = (message: ContactApi) => {
        setSelectedMessage(message);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMessage(null);
    };

    return (
        <div style={{ padding: '0px 20px', }}>
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


