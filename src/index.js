import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

//import { _ } from 'lodash';
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.getElementById('search-box');

function createCountryLi(country) {
  let countryLi = document.createElement('li');
  let countryImg = document.createElement('img');
  let countryName = document.createElement('span');
  countryImg.src = country.flags.svg;
  countryName.textContent = country.name.common;
  countryLi.append(countryImg);
  countryLi.append(countryName);
  document.querySelector('.country-list').append(countryLi);
}

function showCountry(country) {
  createCountryLi(country);
  countryItems = [];
  for (let i = 0; i < 3; i++) {
    countryItems.push(document.createElement('li'));
  }
  countryItems[0].textContent = `Capital: ${country.capital}`;
  countryItems[1].textContent = `Population: ${country.population}`;
  countryItems[2].textContent = `Languages: ${JSON.stringify(
    country.languages
  )}`;
  for (let i = 0; i < 3; i++) {
    document.querySelector('.country-info').append(countryItems[i]);
  }
}

function showCountryList(countryList) {
  countryList.forEach(country => {
    createCountryLi(country);
  });
}

function useCountryResults(data) {
  document.querySelector('.country-list').innerHTML = '';
  document.querySelector('.country-info').innerHTML = '';
  if (data == undefined) {
    Notiflix.Notify.warning('Oops, there is no country with that name');
    return;
  }
  if (data.length == 1) {
    console.log('one country');
    showCountry(data[0]);
    console.log(data);
  } else if (data.length >= 2 && data.length <= 10) {
    showCountryList(data);
    console.log('les than 10 countries');
    console.log(data);
  } else if (data.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

input.addEventListener(
  'input',
  debounce(() => {
    if (input.value.trim() != '') {
      fetchCountries(input.value.trim()).then(data => {
        useCountryResults(data);
      });
    } else {
      // Clear countries
    }
  }, DEBOUNCE_DELAY)
);
