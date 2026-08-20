import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const Section = () => {
    const[albums, setAlbums] = useState([]);
    const[showAll, setShowAll] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("https://qtify-backend.labs.crio.do/albums/top"); 
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        fetchAlbums();
    }, []);

    const scrollByCards = (direction) => {
        if (!carouselRef.current) return;

        const card = carouselRef.current.querySelector(":scope > *");

        if (!card) return;

        const cardWidth = card.offsetWidth;

        const styles = window.getComputedStyle(carouselRef.current);
        const gap = parseFloat(styles.columnGap) || 0;

        const scrollAmount = (cardWidth + gap) * 2;

        carouselRef.current.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth",
        });
    };

    const scrollLeft = () => {
        scrollByCards(-1);
    };

    const scrollRight = () => {
        scrollByCards(1);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>Top Albums</h2>

                <button 
                    className={styles.showAll} 
                    onClick={() => setShowAll(!showAll)}
                    >
                    {showAll ? "Collapse" : "Show All"}
                </button>
            </div>

            <div className={styles.carouselWrapper}>

                {!showAll && (
                    <button
                        className={`${styles.arrow} ${styles.leftArrow}`}
                        onClick={scrollLeft}
                        aria-label="Previous albums"
                    >
                        ‹
                    </button>
                )}

                <div
                    ref={carouselRef}
                    className={`${styles.carousel} ${
                        showAll ? styles.showAllGrid : ""
                    }`}
                >
                    {albums.map((album) => (
                        <Card
                            key={album.id}
                            image={album.image}
                            follows={album.follows}
                            title={album.title}
                        />
                    ))}
                </div>

                {!showAll && (
                    <button
                        className={`${styles.arrow} ${styles.rightArrow}`}
                        onClick={scrollRight}
                        aria-label="Next albums"
                    >
                        ›
                    </button>
                )}
            </div>
        </section>
    );
};

export default Section;