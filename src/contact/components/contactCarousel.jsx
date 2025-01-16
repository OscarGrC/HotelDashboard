import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyle.css';
import { ContactCard } from './contactCard.jsx';

export const ContactCarousel = ({ messages }) => {
    if (!Array.isArray(messages)) {
        return <p>not list </p>;
    }
    return (
        <div style={{ padding: '20px', width: '100%' }}>
            <Swiper
                spaceBetween={20} // Espacio entre las slides
                slidesPerView={4} // Cuántos ContactCards mostrar a la vez
                scrollbar={{ draggable: true }} // Agrega una barra de desplazamiento
            >
                {messages.map((message, index) => (
                    <SwiperSlide key={index}>
                        <ContactCard item={message} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


