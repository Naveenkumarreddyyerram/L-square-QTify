import React from "react";
import styles from "./Card.module.css";

const Card = ({ image, follows, title }) => {
    return (
        <div className={styles.card}>

            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={image}
                    alt={title}
                />
            </div>

            <div className={styles.followContainer}>
                <span className={styles.chip}>
                    {follows} Follows
                </span>
            </div>

            <div className={styles.title}>
                {title}
            </div>

        </div>
    );
};
export default Card;