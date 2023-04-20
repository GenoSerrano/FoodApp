import axios from 'axios';
import { APIKEY_YELP } from '@env';

//Environment secret keys will not be pushed to public github
export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${APIKEY_YELP}`
    }
});