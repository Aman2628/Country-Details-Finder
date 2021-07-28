'use strict';
var x = 2;
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputBox = document.querySelector('.inputBox');


const renderCountry = function (data, className = '') {
    const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 > Capital : ${data.capital}</h4>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)} M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    // countriesContainer.innerHTML = '';
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

// using fetch Api
const getCountryData = function (country) {
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    fetch(url).then(function (response) {
        if (!response.ok) {
            throw new Error('country is not Found' + response.status);
        }
        return response.json();
    }).then(function ([data]) {
        renderCountry(data);
        const nData = data.borders;
        nData.forEach(element => {
            fetch(`https://restcountries.eu/rest/v2/alpha/${element}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    renderCountry(data, "neighbour");
                })
        });
    }).catch(function (err) {
        console.log(err.message);
    })
};
// getCountryData('india')
inputBox.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.keyCode === 13)
        btn.click();
})

btn.addEventListener('click', function () {
    if (inputBox.value != "") {
        const val = inputBox.value;
        countriesContainer.innerHTML = '';
        getCountryData(val);
        inputBox.value = "";
        inputBox.blur();
    }
});

countriesContainer.addEventListener('click', function (e) {
    const ele = e.target;
    if (ele.classList.contains('country__name')) {
        countriesContainer.innerHTML = '';
        getCountryData(ele.textContent);
    }
})

