import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(e) {
  const targetCountry = e.target.value.trim();
  deleteRender();

  if (targetCountry === '') {
    return;
  }

  API.fetchCountries(targetCountry)
    .then(country => {
      if (country.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (country.length >= 2 && country.length <= 10) {
        const countryMarkup = renderCountry(country);
        refs.countryList.innerHTML = countryMarkup;
        return;
      }

      const countryMarkup = renderOneCountry(country);
      refs.countryInfo.innerHTML = countryMarkup;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderOneCountry(country) {
  return country
    .map(({ name, flags, capital, population, languages }) => {
      const language = languages
        .map(lan => {
          return lan.name;
        })
        .join(', ');
      return `
        <div class="gallery__info">
  <h2 class="gallary__title">
  <img class="gallery__image" src="${flags.svg}" alt="${name}" />${name}
  </h2>
  <ul class="gallary__list">
    <li class="item">Capital: ${capital}</li>
    <li class="item">Population: ${population}</li>
    <li class="item">Languages: ${language}</li>
  </ul>
</div>`;
    })
    .join('');
}

function renderCountry(country) {
  return country
    .map(({ name, flags }) => {
      return `<li class="gallery__item">
      <img
        class="gallery__image"
        src="${flags.svg}"
        alt="${name}"
      />
    <p class="gallery__prg">${name}</p>
  </li>`;
    })
    .join('');
}

function deleteRender() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
