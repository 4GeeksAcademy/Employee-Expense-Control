import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Visa from "../../assets/img/ClientCarouselImages/visa.png";
import Puma from "../../assets/img/ClientCarouselImages/puma.png";
import Paypal from "../../assets/img/ClientCarouselImages/paypal.png";
import Bitcoin from "../../assets/img/ClientCarouselImages/bitcoin.png";
import Northface from "../../assets/img/ClientCarouselImages/northface.png";
import Starbucks from "../../assets/img/ClientCarouselImages/starbucks.png";
import Mcdonalds from "../../assets/img/ClientCarouselImages/Mcdonalds.png";


import "./ClientCarousel.css";



export const ClientCarousel = () => {
    return (
        <div className="client-carousel-container">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {[Visa, Puma, Paypal, Starbucks, Bitcoin, Northface, Mcdonalds].map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="client-carousel-img-wrapper">
                            <img src={img} alt={`Client ${index}`} className="client-carousel-img" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
