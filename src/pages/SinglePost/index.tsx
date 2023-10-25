import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
export default function SinglePost() {
  const location = useLocation();

  return (
    <div className={styles.singlePost}>
      <img
        src="/PostImg.svg"
        alt="BlogImg"
        width={1000}
        height={500}
      />
      <div className={styles.postHero}>
        <h1>{location.state.title}</h1>
        <p>{location.state.body}</p>
      </div>
      <div className={styles.aboutAuthor}>
        <div className={styles.image}>
          <span>ABOUT AUTHOR:</span>
          <img
            src="/profile.svg"
            width={100}
            height={100}
            alt="user"
          />
        </div>
        <div className={styles.details}>
          <p>Arthur Black</p>
          <p>
            Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore
            do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.
          </p>
        </div>
      </div>
    </div>
  );
}
