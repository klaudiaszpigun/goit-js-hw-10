import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_AJM1Q0DIcrSygQbnsg4pslo8fl1VJ4Zv7ypIl7hybaPRmZjhzGtPtwP2LjDEsSLm';
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(response => response.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
};
//
