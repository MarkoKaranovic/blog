import React from 'react';

import { useSearchResources } from '../../context/search';
import Searchbar from '../../components/Searchbar';
import styles from './Post.module.scss';

import { Cards } from '../../components/Cards';
import { GridLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
const propsMessage = 'Hello from';
const componentName = 'Post page';

export default function Posts() {
  const { posts, onFilterChange, isLoading, count } = useSearchResources();
  console.log(`${propsMessage}${componentName}`);
  return (
    <div className={styles.postPage}>
      <Searchbar
        onChange={(value: number | null) => {
          onFilterChange({ userId: value });
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

        <Pagination
          currentPage={1}
          totalCount={count}
          pageSize={10}
          propsMessage={propsMessage}
          onPageChange={(page: number) => onFilterChange({ _start: page * 10 - 10, _end: page * 10 })}
        />
      </div>
    </div>
  );
}
