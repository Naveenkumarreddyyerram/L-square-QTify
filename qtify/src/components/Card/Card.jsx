import React from "react";
import styles from "./Card.module.css";

const Card = ({
    image,
    title,
    follows,
    likes,
    isSong = false,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={title}
                    className={styles.image}
                />
            </div>

            <div className={styles.info}>
                <span className={styles.chip}>
                    {isSong
                        ? `${likes || 0} Likes`
                        : `${follows || 0} Follows`}
                </span>
            </div>

            <p className={styles.title}>{title}</p>
        </div>
    );
};
export default Card;