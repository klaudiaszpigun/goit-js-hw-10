// zaimportowanie biblioteki axios
import axios from 'axios';

// stworzenie callbacków któree będą importowane do innego pliku

// callback zwracający tablicę obiektów z API
export const fetchBreeds = () => {
  // konieczność użycia klucza który dostaliśmy przy rejestracji
  axios.defaults.headers.common['x-api-key'] =
    'live_AJM1Q0DIcrSygQbnsg4pslo8fl1VJ4Zv7ypIl7hybaPRmZjhzGtPtwP2LjDEsSLm';
  // zwrócenie tablicy obiektów z danymi
  return (
    axios
      .get(`https://api.thecatapi.com/v1/breeds`)
      // z ogromnej tablicy obiektów weź tylko dane z właściwośći name, tam są istotne dla nas informacje
      .then(response => response.data)
  );
};

// callback który ma w parametrze numer rasy
export const fetchCatByBreed = breedId => {
  return (
    axios
      // który będzie doklejany do linku
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      // a później będzie wyciągał informacje z właściwości data
      .then(response => response.data)
  );
};
