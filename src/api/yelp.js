import axios from 'axios';
import { APIKEY_YELP } from '@env';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${APIKEY_YELP}`
    }
});