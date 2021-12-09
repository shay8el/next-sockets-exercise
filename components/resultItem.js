import styles from "./resultItem.module.scss";
import React from "react";

export default function ResultItem({ name, images, rating, people, price, currency }) {
  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        { images && images.length > 0 && <img src={images[0].URL} className={styles.image} />}
      </div>
      <div className={styles.desc}>
        <h1>{name}</h1>
        <p>{rating} stars</p>
        <p>{people} people</p>
      </div>
      <div className={styles.summary}>
        <div className={styles.price}>
          {currency === 'EUR' ? '€' : currency}
          {price} 
        </div>
        <div >
          Total price per person
        </div>
        <div className={styles.button}>
          View Details
        </div>
      </div>
    </div>
  );
}
