import { createBrowserRouter } from 'react-router-dom';
import Posts from '../pages/Posts';
import SinglePost from '../pages/SinglePost';
import * as Search from '../context/search';
export enum Routes {
  POSTS = 'posts',
  POST = 'post/:postId',
  NOT_FOUND = '*',
}

export const router = createBrowserRouter([
  {
    path: Routes.POSTS,
    element: (
      <Search.Provider>
        <Posts />
      </Search.Provider>
    ),
  },
  {
    path: Routes.POST,
    element: <SinglePost />,
  },
  // {
  //   path: Routes.NOT_FOUND,
  //   element: <PageNotFound />,
  // },
]);
