import Notiflix from 'notiflix';
import { fetchBreeds, fetchImageByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');
const error = document.querySelector('.error');

// ukryj error
error.classList.add('hidden');

// spróbuj pokazać ładowanie, a później pobrać z serwera dane i wygenerować opcje w rozwijanym menu
try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

// funkcja generująco opcje w rozwijanym menu
const renderSelect = breeds => {
  // iteruj po każdej rasie, znajduj id i name w każdym obiekcie i wklejaj te dane do kodu HTML
  const markup = breeds
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
  breedSelect.innerHTML = markup;
  // i po wklejeniu danych ukryj ładowanie
  loader.classList.add('hidden');
};

// gdy będziee zdarzenie change na select
breedSelect.addEventListener('change', event => {
  // przypisz do zmiennej catId wartość atrybutu value => <option value="id">name</option>
  const catId = event.target.value;
  // pokaż ładowanie
  loader.classList.remove('hidden');
  // wyczyść całego diva z informacjami o kocie
  catInfo.innerHTML = '';
  // wczytaj zdjęcie kota z Id podanym w zmiennej
  fetchImageByBreed(catId)
    // gdy to sie uda to od razu generuj kod z danycmi o kocie
    .then(data => renderCat(data))
    // jeśli nie to wyświetl alert
    .catch(error => {
      Notiflix.Notify.failure('Error checking cat:');
      // i ukryj ładowanie
      loader.classList.add('hidden');
    });
});

// funkcja generująca dane o kocie mająca w parametrze dane o zdjęciu kota, każdy kot ma tablicę z jednym obiektem który jest zdjęciem
const renderCat = catData => {
  // dostanie się do pierwszego elementu i jego właściwości
  const url = catData[0].url;
  // dostanie się do pierwszego elementu tablicy, który posiada również tablicę i dostanie się do jej pierwszego elementu
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
