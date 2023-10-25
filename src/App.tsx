import { RouterProvider } from 'react-router-dom';

import './styles.scss';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as Search from './context/search';

import { Api } from './api';

function App() {
  return (
    <div className="App">
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
