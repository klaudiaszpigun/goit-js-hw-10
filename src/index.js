import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelectHtml = document.querySelector('.breed-select');
const errorHtml = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');

// ukrywamy error
errorHtml.classList.add('hidden');
// uwidaczniamy ładowanie
loader.classList.remove('hidden');

// sprawdzanie czy generowanie informacji o zdjęciu się powiedzie
// jeśli tak to automatycznie ukrywane jest ładowanie na ekranie
try {
  // wyciągnąć dane z backendu
  fetchBreeds().then(data => {
    renderBreeds(data);
    loader.classList.add('hidden');
  });
} catch (error) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  loader.classList.add('hidden');
}

const renderBreeds = breeds => {
  const markup = breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelectHtml.innerHTML = markup;
};

const renderCat = catData => {
  const url = catData[0].url;
  const description = catData[0].breeds[0].description;
  const temperament = catData[0].breeds[0].temperament;
  const name = catData[0].breeds[0].name;

  catInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${url}" alt="${name}" height="400"/>
    <p>${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
  `;
};

breedSelectHtml.addEventListener('change', event => {
  const breedId = event.target.value;
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(catData => {
      renderCat(catData);
      loader.classList.add('hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      loader.classList.add('hidden');
    });
});
