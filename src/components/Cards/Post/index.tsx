/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../../constants/QueriesKeys';
import { Api } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { Card } from '../Base/Card';
import React from 'react';
import { GridLoader } from 'react-spinners';
import Button from '../../Button/Button';
import { type PostsType } from '../../../api/posts';
import { type CommentsType } from '../../../api/comments';
import styles from './PostCard.module.scss';
import { ButtonTypes } from '../../../types';

interface OwnProps {
  post: PostsType;
  propsMessage?: string;
}
const componentName = 'Card Post';

export default function Post({ post, propsMessage }: OwnProps) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = React.useState(false);
  const { data } = useQuery({
    queryKey: QueriesKeys[QueryKey.USER](post.userId),
    queryFn: async () => await Api.Users.getById(post.userId),
  });
  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: QueriesKeys[QueryKey.COMMENTS](post.id),
    queryFn: async () => await Api.Comments.get({ postId: post.id }),
    enabled: showComments,
  });

  const renderComments = () => {
    if (isLoadingComments) {
      return <GridLoader className={styles.loader} />;
    }
    return (
      <ul>
        {comments?.map((comment: CommentsType) => (
          <li key={comment.id}>
            <div className={styles.commentAuthor}>
              <img
                src="/profile.svg"
                width={50}
                height={50}
                alt="user"
              />
              <div>{comment.email}</div>
            </div>
            <div className={styles.commentBody}>{comment.name}</div>
          </li>
        ))}
      </ul>
    );
  };
  console.log(`${propsMessage} ${componentName}`);
  return (
    <Card
      className={styles.postCard}
      radius="xs"
      maw={50}
      propsMessage={propsMessage}
    >
      <Card.Section>
        <div className={styles.postWrapper}>
          <img src="/test-post.svg" />
          <div>
            <h3>{post.title}</h3>
            <p>{data?.name}</p>
            <p>{post.body}</p>
            <div className={styles.btnWrapper}>
              <Button
                onClick={() => {
                  setShowComments(!showComments);
                }}
                type={ButtonTypes.CIRCLE}
              >
                <FaComments />
              </Button>
              <Button
                type={ButtonTypes.SQUARE}
                onClick={() => {
                  navigate(`/post/${post.id}`, { state: post });
                }}
                className={styles.visitBtn}
              >
                Visit post
              </Button>
            </div>
          </div>
        </div>
        {showComments && renderComments()}
      </Card.Section>
    </Card>
  );
}
