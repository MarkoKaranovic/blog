import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Api } from './api';

class Main {
  apiUrl = 'https://jsonplaceholder.typicode.com';
  root;

  constructor() {
    this.root = ReactDOM.createRoot(document.getElementById('root') as Element);
  }

  init = async () => {
    return this.render();
  };

  render = async () => {
    this.setupInterceptor();
    this.root.render(<App />);
  };

  setupInterceptor = () => {
    Api.instance.interceptors.request.use(
      async (config) => {
        config.url = `${this.apiUrl}/${config.url}`;
        config.baseURL = this.apiUrl;

        return config;
      },
      (error) => Promise.reject(error),
    );
  };
}

const main = new Main();

main.init();
