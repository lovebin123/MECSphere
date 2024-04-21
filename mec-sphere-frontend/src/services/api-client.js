
import axios, { CanceledError } from 'axios';

export default axios.create({
  baseURL: 'https://mecsphere.onrender.com',
})

export { CanceledError };