import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../../constants/QueriesKeys';
import { Api } from '../../../api';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { FaComments } from 'react-icons/fa';
import { Card } from '../Card';
import React from 'react';
import { GridLoader } from 'react-spinners';
import Button from '../../Button/Button';
import { PostsType } from '../../../api/posts';
import { CommentsType } from '../../../api/comments';

type OwnProps = {
  post: PostsType;
};

export default function Post({ post }: OwnProps) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = React.useState(false);
  const { data } = useQuery({
    queryKey: QueriesKeys[QueryKey.USER](post.userId),
    queryFn: async () => await Api.Users.getUser(post.userId),
  });
  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: QueriesKeys[QueryKey.COMMENTS](post.id),
    queryFn: async () => await Api.Comments.getComments({ postId: post.id, _limit: null }),
    enabled: showComments,
  });

  const renderComments = () => {
    if (isLoadingComments) {
      return (
        <GridLoader
          color="#b5a6a9"
          style={{ margin: '0 auto' }}
        />
      );
    }
    return (
      <ul>
        {comments?.data.map((comment: CommentsType) => (
          <li>
            <div className={styles.commentAuthor}>
              <img
                src="/user-test.png"
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

  return (
    <Card
      className={styles.postCard}
      shadow="sm"
      padding="xl"
      radius="xs"
      withBorder
      maw={40}
    >
      <Card.Section className={styles.cardHeader}>
        <div className={styles.author}>
          <img
            src="/user-test.png"
            width={100}
            height={100}
            alt="user"
          />
          <p>{data?.data.name}</p>
        </div>
        <h2>{post.title}</h2>
      </Card.Section>
      <div className={styles.cardBody}>
        <p>{post.body}</p>
        <Button
          onClick={() => setShowComments(!showComments)}
          type="circle"
        >
          <FaComments />
        </Button>

        {showComments && renderComments()}
      </div>

      <Card.Section className={styles.cardFooter}>
        <Button
          type="square"
          onClick={() => navigate(`/post/${post.id}`)}
          className={styles.visitBtn}
        >
          Visit post
        </Button>
      </Card.Section>
    </Card>
  );
}
