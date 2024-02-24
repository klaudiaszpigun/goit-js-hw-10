import axios from 'axios';

// eksportowanie funkcji która zwraca wszystkie informacje z serwera
export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_AJM1Q0DIcrSygQbnsg4pslo8fl1VJ4Zv7ypIl7hybaPRmZjhzGtPtwP2LjDEsSLm';
  return (
    axios
      .get(`https://api.thecatapi.com/v1/breeds`)
      // response to cała odpowiedź z serwera, a reesponse.data to już właściwe dane
      .then(response => response.data)
  );
};

// eksportowaniie funnkcji która ma w parametrze ID rasy zwraca informacje dotyczące jego zdjęcia
export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
};
