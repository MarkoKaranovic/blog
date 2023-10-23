import { RouterProvider } from 'react-router-dom';

import './styles.scss';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Api } from './api';
import * as Search from './context/search';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={Api.Client}>
        <Search.Provider>
          <RouterProvider router={router} />
        </Search.Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
