import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";

import styles from "./Carousel.module.css";

const Carousel = ({ items, renderItem }) => {
    const [swiper, setSwiper] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const updateNavigation = (instance) => {
        setIsBeginning(instance.isBeginning);
        setIsEnd(instance.isEnd);
    };

    return (
        <div className={styles.carouselContainer}>
            {!isBeginning && (
                <LeftNavigation
                    onClick={() => swiper?.slidePrev()}
                />
            )}

            <Swiper
                onSwiper={(instance) => {
                    setSwiper(instance);
                    updateNavigation(instance);
                }}
                onSlideChange={updateNavigation}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    480: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1280: {
                        slidesPerView: 7,
                    },
                }}
                className={styles.swiper}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={item.id || index}>
                        {renderItem(item)}
                    </SwiperSlide>
                ))}
            </Swiper>

            {!isEnd && (
                <RightNavigation
                    onClick={() => swiper?.slideNext()}
                />
            )}
        </div>
    );
};

export default Carousel;