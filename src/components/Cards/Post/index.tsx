import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { QueriesKeys, QueryKey } from '../../../constants/QueriesKeys';
import { Api } from '../../../api';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Post({ post }: any) {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: QueriesKeys[QueryKey.USER](post.userId),
    queryFn: async () => await Api.Users.getUser(post.userId),
  });
  const { data: comments } = useQuery({
    queryKey: QueriesKeys[QueryKey.COMMENTS](post.userId),
    queryFn: async () => await Api.Comments.getComments({ postId: post.userId, _limit: null }),
  });

  return (
    <div
      onClick={() => navigate(`/post/${post.id}`)}
      className={styles.postCard}
    >
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <span>Author: {data?.data.name}</span>
      <ul>
        {comments?.data.map((comment: any) => (
          <li>{comment.body}</li>
        ))}
        {/* <button>Show all comments</button> */}
      </ul>
    </div>
  );
}
