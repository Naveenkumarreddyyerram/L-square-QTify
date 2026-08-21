import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import styles from "./Section.module.css";

const Section = ({ title, endpoint, isSongs = false }) => {
    const [items, setItems] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint);

                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else if (Array.isArray(response.data?.data)) {
                    setItems(response.data.data);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [endpoint]);

    useEffect(() => {
        if (!isSongs) return;

        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    "https://qtify-backend.labs.crio.do/genres"
                );

                const data = response.data;

                if (Array.isArray(data)) {
                    setGenres(data);
                } else if (Array.isArray(data?.data)) {
                    setGenres(data.data);
                } else if (Array.isArray(data?.genres)) {
                    setGenres(data.genres);
                } else {
                    setGenres([]);
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
                setGenres([]);
            }
        };

        fetchGenres();
    }, [isSongs]);

    const handleGenreChange = (event, newValue) => {
        setSelectedGenre(newValue);
    };

    const filteredItems =
        selectedGenre === "all"
            ? items
            : items.filter(
                  (song) =>
                      song.genre?.key?.toLowerCase() ===
                      selectedGenre.toLowerCase()
              );

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>{title}</h2>

                {!isSongs && (
                    <button
                        className={styles.showAll}
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? "Collapse" : "Show All"}
                    </button>
                )}
            </div>

            {isSongs && (
                <Tabs
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    className={styles.tabs}
                    variant="scrollable"
                    scrollButtons={false}
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                >
                    <Tab
                        value="all"
                        label="All"
                        className={
                            selectedGenre === "all"
                                ? styles.activeTab
                                : styles.tab
                        }
                    />

                    {genres.map((genre) => (
                        <Tab
                            key={genre.key}
                            value={genre.key}
                            label={genre.label}
                            className={
                                selectedGenre === genre.key
                                    ? styles.activeTab
                                    : styles.tab
                            }
                        />
                    ))}
                </Tabs>
            )}

            {isSongs ? (
                <Carousel
                    items={filteredItems}
                    renderItem={(song) => (
                        <Card
                            image={song.image}
                            title={song.title}
                            likes={song.likes}
                            isSong={true}
                        />
                    )}
                />
            ) : !showAll ? (
                <Carousel
                    items={items}
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
                    {items.map((album) => (
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