import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import styles from "./Footer.module.css";

export default function Footer() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("https://qtify-backend.labs.crio.do/faq");
        setFaqs(response.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <footer className={styles.footer}>
      <h2 className={styles.heading}>FAQs</h2>
      <div className={styles.accordionContainer}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            className={styles.accordion}
            disableGutters
            elevation={0}
          >
            <AccordionSummary
              expandIcon={
                <svg
                  className={styles.expandIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#34c94b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              className={styles.summary}
            >
              <span className={styles.question}>{faq.question}</span>
            </AccordionSummary>
            <AccordionDetails className={styles.details}>
              <span className={styles.answer}>{faq.answer}</span>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </footer>
  );
}