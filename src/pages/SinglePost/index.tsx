import React from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../api';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';

export default function SinglePost() {
  const { postId } = useParams();
  const post = Api.Client.getQueriesData({ queryKey: ['posts'], exact: false });
  console.log(post);
  return <div>SinglePost</div>;
}
