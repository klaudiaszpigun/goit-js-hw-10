import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');
const error = document.querySelector('.error');

error.classList.add('hidden');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

const renderSelect = breeds => {
  const markup = breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelect.innerHTML = markup;
  loader.classList.add('hidden');
};

breedSelect.addEventListener('change', event => {
  const catId = event.target.value;
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  fetchCatByBreed(catId)
    .then(data => renderCat(data))
    .catch(error => {
      Notiflix.Notify.failure('Error checking cat:');
      loader.classList.add('hidden');
    });
});

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
  loader.classList.add('hidden');
};
