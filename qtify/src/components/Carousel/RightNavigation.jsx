import React from "react";
import styles from "./Carousel.module.css";

const RightNavigation = ({ onClick }) => {
    return (
        <button
            className={`${styles.navigationButton} ${styles.rightNavigation}`}
            onClick={onClick}
            aria-label="Next"
        >
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="20" cy="20" r="20" fill="#34C94B" />
                <path
                    d="M17 12L25 20L17 28"
                    stroke="#121212"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};

export default RightNavigation;