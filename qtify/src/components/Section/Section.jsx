import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

const Section = () => {
    const[albums, setAlbums] = useState([]);
    const[collapsed, setCollapsed] = useState(false);

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

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>Top Albums</h2>

                <button className={styles.collapseButton} onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? "Show All" : "Collapse"}
                </button>
            </div>
            {!collapsed && (
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