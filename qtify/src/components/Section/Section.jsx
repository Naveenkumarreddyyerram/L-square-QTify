import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

import styles from "./Section.module.css";

const Section = ({ title, endpoint }) => {
    const [albums, setAlbums] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(endpoint);
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        fetchAlbums();
    }, [endpoint]);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>{title}</h2>

                <button
                    className={styles.showAll}
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "Collapse" : "Show All"}
                </button>
            </div>

            {!showAll ? (
                <Carousel
                    items={albums}
                    renderItem={(album) => (
                        <Card
                            image={album.image}
                            follows={album.follows}
                            title={album.title}
                        />
                    )}
                />
            ) : (
                <div className={styles.grid}>
                    {albums.map((album) => (
                        <Card
                            key={album.id}
                            image={album.image}
                            follows={album.follows}
                            title={album.title}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Section;