import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './SinglePost.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Api } from '../../api';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';
export default function SinglePost() {
  const location = useLocation();
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: QueriesKeys[QueryKey.POST](Number(postId)),
    queryFn: async () => Api.Posts.getById(Number(postId)),
    enabled: !location.state,
    initialData: location.state ?? undefined,
  });

  return (
    <div className={styles.singlePost}>
      <img
        src="/PostImg.svg"
        alt="BlogImg"
        width={1000}
        height={500}
      />
      <div className={styles.postHero}>
        <h1>{data?.title}</h1>
        <p>{data?.body}</p>
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
          <p>{data.user?.name}</p>
          <p>
            Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore
            do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.
          </p>
        </div>
      </div>
    </div>
  );
}
