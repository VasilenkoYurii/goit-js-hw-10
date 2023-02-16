const BASE_URL = 'https://restcountries.com/v2';

async function fetchCountries(country) {
  const response = await fetch(
    `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
  );
  const count = response.json();

  return count;

  // return fetch(
  //   `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
  // ).then(response => response.json());
}

export default { fetchCountries };
