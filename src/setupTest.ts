import { configure } from '@testing-library/react';

import '@testing-library/jest-dom';
import 'jest-dom/extend-expect';

import 'intersection-observer';
import { Api } from './api';

configure({
  testIdAttribute: 'data-test-id',
});

beforeAll(() => {
  Api.Client.clear();
});

afterEach(() => {
  localStorage.clear();
});

afterAll(() => ({}));
