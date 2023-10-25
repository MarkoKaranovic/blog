import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Api } from './api';
import * as Search from './context/search';

import './styles.scss';

function App() {
  return (
    <div>
      <QueryClientProvider client={Api.Client}>
        <Search.Provider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </Search.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
