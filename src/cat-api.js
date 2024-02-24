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
export const fetchImageByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
};

/*
{
  "id":"0XYvRd7oD",
  "width":1204,"height":1445,
  "url":"https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
  "breeds":[{
      "weight":{"imperial":"7  -  10","metric":"3 - 5"},
      "id":"abys","name":"Abyssinian",
      "temperament":"Active, Energetic, Independent, Intelligent, Gentle",
      "origin":"Egypt",
      "country_codes":"EG",
      "country_code":"EG",
      "life_span":"14 - 15",
      "wikipedia_url":"https://en.wikipedia.org/wiki/Abyssinian_(cat)"
}]
}
*/

/*
[{
  "id":"ebv",
  "url":"https://cdn2.thecatapi.com/images/ebv.jpg",
  "width":176,"height":540,
  "breeds":[{
      "weight":{"imperial":"7  -  10","metric":"3 - 5"},
      "id":"abys","name":"Abyssinian",
      "temperament":"Active, Energetic, Independent, Intelligent, Gentle",
      "origin":"Egypt",
      "country_codes":"EG",
      "country_code":"EG",
      "life_span":"14 - 15",
      "wikipedia_url":"https://en.wikipedia.org/wiki/Abyssinian_(cat)"
  }]
  "favourite":{}
}]
*/
