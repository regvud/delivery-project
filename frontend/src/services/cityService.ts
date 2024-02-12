import axios from 'axios';
import { Cities } from '../types/departmentTypes';

export const cityService = () =>
  axios
    .get<Cities>('https://parseapi.back4app.com/classes/City', {
      params: {
        limit: 200,
        order: '-population',
        keys: 'name,country',
      },
      headers: {
        'X-Parse-Application-Id': 'WHhatLdoYsIJrRzvkD0Y93uKHTX49V9gmHgp8Rw3',
        'X-Parse-Master-Key': 'iyzSAHUmPKUzceWRIIitUD1OKAGHvVUzEYb5DCpj',
      },
    })
    .then((response) => response.data.results)
    .catch((error) => {
      console.error('Error:', error);
    });
