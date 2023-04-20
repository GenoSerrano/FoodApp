import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
      console.log(`Calling Yelp API ${searchTerm}`);
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'New York'
        }
      });
      setResults(response.data.businesses);
      console.log(`Finished getting results from Yelp API ${response.data.businesses.length}`);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  return [searchApi, results, errorMessage];
};
