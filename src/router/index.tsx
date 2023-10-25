import { Navigate, createBrowserRouter } from 'react-router-dom';
import Posts from '../pages/Posts';
import SinglePost from '../pages/SinglePost';

export enum Routes {
  POSTS = 'posts',
  POST = 'post/:postId',
  NOT_FOUND = '*',
}

export const router = createBrowserRouter([
  {
    path: Routes.POSTS,
    element: <Posts />,
  },
  {
    path: Routes.POST,
    element: <SinglePost />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <Navigate to={Routes.POSTS} />,
  },
]);
