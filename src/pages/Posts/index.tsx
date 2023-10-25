import React from 'react';

import { useSearchResources } from '../../context/search';
import Searchbar from '../../components/Searchbar';
import styles from './Post.module.scss';

import { Cards } from '../../components/Cards';
import { GridLoader } from 'react-spinners';
const propsMessage = 'Hello from';

export default function Posts() {
  const { posts, onFilterChange, isLoading } = useSearchResources();

  return (
    <div className={styles.postPage}>
      <Searchbar
        onChange={(value: number) => {
          onFilterChange('userId', value);
        }}
        propsMessage={propsMessage}
      />

      <div className={styles.postList}>
        {isLoading && <GridLoader className={styles.loader} />}
        {posts?.map((post) => {
          return (
            <Cards.Post
              key={post.id}
              post={post}
              propsMessage={propsMessage}
            />
          );
        })}

        {/* PAGINATION */}
      </div>
    </div>
  );
}
