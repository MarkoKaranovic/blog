import { RouterProvider } from 'react-router-dom';

import './styles.scss';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Api } from './api';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={Api.Client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
