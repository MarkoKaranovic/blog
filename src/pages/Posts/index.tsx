import React from 'react';

import { Cards } from '../../components/Cards';

import { useSearchResources } from '../../context/search';
import Searchbar from '../../components/Searchbar';
import style from './styles.module.scss';
import { Api } from '../../api';

export default function Posts() {
  const { posts, onFilterChange } = useSearchResources();

  return (
    <div className={style.postPage}>
      <Searchbar
        onChange={(value: string) => onFilterChange('userId', value)}
        suggestionField="name_like"
        resource={(value: any) => Api.Users.getUsers(value)}
      />
      <div className={style.postList}>
        {posts?.map((post: any) => {
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
