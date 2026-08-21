import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Feedback from "../Feedback/Feedback";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <Search
            placeholder="Search a song of your choice"
            searchData={searchData}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={() => setIsFeedbackOpen(true)}>
            Give Feedback
          </Button>
        </div>
      </nav>

      {isFeedbackOpen && (
        <Feedback onClose={() => setIsFeedbackOpen(false)} />
      )}
    </>
  );
}

export default Navbar;