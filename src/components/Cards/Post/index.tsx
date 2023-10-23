import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../../constants/QueriesKeys';
import { Api } from '../../../api';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Card } from '../Card';

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
  console.log(comments);
  return (
    <Card
      onClick={() => navigate(`/post/${post.id}`)}
      className={styles.postCard}
    >
      <h2>{post.title}</h2>
      <div className={styles.cardBody}>
        <p>{post.body}</p>
        <span>Author: {data?.data.name}</span>
        <ul>
          {comments?.data.map((comment: any) => (
            <li>
              <FaUserAstronaut />
              <div>
                <div>{comment.email}</div>
                <div>{comment.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
