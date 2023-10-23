import axios from 'axios';

export const baseURL = 'https://jsonplaceholder.typicode.com/';

const instance = axios.create({ baseURL });
export default instance;
