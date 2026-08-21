import React, { useState } from "react";
import styles from "./Footer.module.css";

const faqs = [
    {
        question: "Is QTify free to use?",
        answer: "Yes, QTify is completely free to use.",
    },
    {
        question: "Can I download and listen to songs offline?",
        answer: "Sorry, unfortunately we don't provide the service to download any songs.",
    },
    {
        question: "Can I listen to songs without creating an account?",
        answer: "Yes, you can listen to songs without creating an account.",
    },
    {
        question: "Does QTify have advertisements?",
        answer: "QTify provides a smooth music listening experience.",
    },
];

const Footer = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index
        );
    };

    return (
        <footer className={styles.footer}>
            <h2 className={styles.heading}>FAQs</h2>

            <div className={styles.faqContainer}>
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            className={styles.faq}
                            key={faq.question}
                        >
                            <button
                                className={`${styles.question} ${
                                    isOpen ? styles.open : ""
                                }`}
                                onClick={() => handleToggle(index)}
                                aria-expanded={isOpen}
                            >
                                <span>{faq.question}</span>

                                <span
                                    className={`${styles.arrow} ${
                                        isOpen ? styles.arrowOpen : ""
                                    }`}
                                >
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 10L14 18L22 10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>

                            {isOpen && (
                                <div className={styles.answer}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;