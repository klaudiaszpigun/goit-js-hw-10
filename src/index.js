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
  fetchBreeds()
    // jeśli się to uda to
    .then(data => {
      // wygeneruj informacje o zdjęciu
      renderBreeds(data);
      // i ukryj ładowanie
      loader.classList.add('hidden');
    });
} catch (error) {
  // jeśli wystąpił jakiś błąd to jest wyświetlany komunikat notify
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  // i ukrywane jest ładowanie
  loader.classList.add('hidden');
}

// funkcja renderująca opcje wyboru
const renderBreeds = breeds => {
  const markup = breeds
    // breeds to obiekt z wszystkimi rasami z kórego pobierane są dwa pola, które później wstawiane są do kodu
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    // łączone w string
    .join('');
  // i dodawane do kodu HTML
  breedSelectHtml.innerHTML = markup;
};

const renderCat = catData => {
  // pierwszego obiektu z tablicy wartość właściwości url
  const url = catData[0].url;
  // pierwszego obiektu z tablicy
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

// przy naciśnięciu na wybranie rasy
breedSelectHtml.addEventListener('change', event => {
  // id rasy jest wartość elementu na który naciśniemy
  const breedId = event.target.value;
  // wtedy ładowanie się pokazuje
  loader.classList.remove('hidden');
  // w divie catInfo jest pusty string
  catInfo.innerHTML = '';
  // wywołując funkcję która łaaduje informacje o zdjęciu, które zostało naciśnięte
  fetchCatByBreed(breedId)
    // gdy wszystko się pobierze
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
