import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/v1";

export default axios.create({
    withCredentials: true,
    credentials: 'include',
    baseURL,
});