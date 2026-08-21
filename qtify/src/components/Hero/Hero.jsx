import React from "react";
import styles from "./Hero.module.css";
import heroHeadphones from "../../assets/hero_headphones.png";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>100 Thousand Songs, ad-free</h1>
        <h1 className={styles.heading}>Over thousands podcast episodes</h1>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={heroHeadphones}
          className={styles.image}
          alt="headphones"
        />
      </div>
    </section>
  );
}

export default Hero;