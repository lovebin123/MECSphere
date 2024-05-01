
import axios, { CanceledError } from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000',
})

export { CanceledError };