import React from 'react';

import { useSearchResources } from '../../context/search';
import Searchbar from '../../components/Searchbar';
import style from './styles.module.scss';

import { Cards } from '../../components/Cards';
import { GridLoader } from 'react-spinners';

export default function Posts() {
  const { posts, onFilterChange, isLoading } = useSearchResources();

  return (
    <div className={style.postPage}>
      <Searchbar
        onChange={(value: string) => {
          onFilterChange('userId', value);
        }}
      />

      <div className={style.postList}>
        {isLoading && (
          <GridLoader
            color="#635255"
            style={{ marginTop: '20%' }}
          />
        )}
        {posts?.map((post) => {
          return (
            <Cards.Post
              key={post.id}
              post={post}
            />
          );
        })}

        {/* PAGINATION */}
      </div>
    </div>
  );
}
