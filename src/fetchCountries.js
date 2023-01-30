export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`//,
   // { mode: 'no-cors' }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(e => {
      console.log(e);
    });
}
