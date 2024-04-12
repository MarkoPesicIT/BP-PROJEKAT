document.addEventListener("DOMContentLoaded", function() {
  var ikoniceContainers = document.getElementsByClassName('ikonica-container');

function promeniBoju(klknuto) {
    for (var i = 0; i < ikoniceContainers.length; i++) {
        ikoniceContainers[i].classList.remove('clickedIcon');
        var deca = ikoniceContainers[i].nextElementSibling;
        if (deca && deca.classList.contains('ikonicaHover')) {
            var kocka = deca.querySelector('.kocka');
            var linija = deca.querySelector('.linija');
            if (kocka) {
                kocka.style.backgroundColor = "";
            }
            if (linija) {
                linija.style.backgroundColor = "";
            }
        }
    }
    klknuto.classList.add('clickedIcon');
    var deca = klknuto.nextElementSibling;
    if (deca && deca.classList.contains('ikonicaHover')) {
        var kocka = deca.querySelector('.kocka');
        var linija = deca.querySelector('.linija');
        if (kocka) {
            kocka.style.backgroundColor = "#3678fd";
        }
        if (linija) {
            linija.style.backgroundColor = "#3678fd";
        }
    }
    var sections = document.getElementsByClassName('strana');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    var sectionClass = klknuto.id.replace('btn', '.str');
    var correspondingSection = document.querySelector(sectionClass);
    if (correspondingSection) {
        correspondingSection.classList.add('active');
    }
}

for (var i = 0; i < ikoniceContainers.length; i++) {
    ikoniceContainers[i].addEventListener('click', function(event) {
        var klknuto = event.currentTarget;
        promeniBoju(klknuto);
    });
}

var defaultSelectedIcon = document.getElementById('btnPocetna');
promeniBoju(defaultSelectedIcon);


  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(raw => raw.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities).slice(0,32);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li data-city="${place.city}, ${place.state}" data-population="${place.population}">
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

function closeSuggestions() {
  suggestions.innerHTML = '';
}

function pasteSuggestion(city) {
  searchInput.value = city;
  suggestions.innerHTML = '';
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

document.addEventListener('click', closeSuggestions);

suggestions.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    const city = event.target.querySelector('.name').textContent;
    pasteSuggestion(city);
  }
});

suggestions.addEventListener('click', function(event) {
  event.stopPropagation();
});

searchInput.addEventListener('focus', function() {
  this.value = '';
});


suggestions.addEventListener('click', function(event) {
  if (event.target.tagName === 'SPAN') {
    const city = event.target.closest('li').querySelector('.name').textContent;
    pasteSuggestion(city);
  }
});

suggestions.addEventListener('click', function(event) {
  event.stopPropagation();
});

function generateRandomNumber() {
  let randomNumber = '';
  for (let i = 0; i < 5; i++) {
      const randomArray = new Uint32Array(1);
      crypto.getRandomValues(randomArray);
      randomNumber += String(randomArray[0] % 10000).padStart(4, '0');
  }
  return randomNumber;
}

const button = document.querySelector('.toggle');
const listItems = document.querySelectorAll('.list-item');
const pozivNaBrojSpan = document.getElementById('pozivNaBroj');
const pozivNaBrojPopUp = document.querySelector('.pozivNaBrojPopUp');
const zatvoriButton = document.getElementById('zatvoripozivNaBrojPopUp');
zatvoriButton.addEventListener('click', closePopUp);

function closePopUp() {
  pozivNaBrojPopUp.classList.remove('active');
}

const usedNumbers = new Set();

listItems.forEach(item => {
  item.addEventListener('click', () => {
      console.log("Clicked item:", item.textContent);
      button.textContent = item.textContent.trim();
      console.log("Button text:", button.textContent);
      console.log("Odabrano:", button.textContent);

      if (button.textContent === "MESECNO ELEKTRONSKI" || button.textContent === "GODISNJE ELEKTRONSKI") {
          let randomNumber;
          do {
              randomNumber = generateRandomNumber();
              console.log("Generated number:", randomNumber);
          } while (usedNumbers.has(randomNumber));
          
          usedNumbers.add(randomNumber);
          
          pozivNaBrojSpan.textContent = randomNumber;
          pozivNaBrojPopUp.classList.add('active');
      } else {
          pozivNaBrojPopUp.classList.remove('active');
      }
  });
});

button.addEventListener('click', () => {
  console.log("Button clicked");
});

const btn_odustaniDodajclana = document.getElementById('odustanidodajClana');
const btn_odustanipopDodajclana = document.getElementById('odustani_dodajClana');
const btn_potvrdiDodajclana = document.getElementById('potvrdidodajClana');
const btn_potvrdipopDodajclana = document.getElementById('potvrdi_dodajClana');
const btn_dodajClana = document.querySelector('.dodajclanaBG');
const dodajClanaPopUp = document.querySelector('.dodavanjeClanaPopUp');
const popuppotvrdaPotvrde = document.querySelector('.potvrdazadodavanjeclana');

btn_dodajClana.addEventListener('click', () => {
  dodajClanaPopUp.classList.add('active');
  dodajClanaPopUp.style.display = 'flex';
  console.log('kliknuto za pop up otvaranje dodavanje clana');
});

btn_odustaniDodajclana.addEventListener('click', () => {
  dodajClanaPopUp.classList.remove('active');

});

btn_potvrdiDodajclana.addEventListener('click', () => {
  popuppotvrdaPotvrde.classList.add('active');
});

btn_odustanipopDodajclana.addEventListener('click', () => {
  popuppotvrdaPotvrde.classList.remove('active');
  
});

btn_potvrdipopDodajclana.addEventListener('click', () => {
  popuppotvrdaPotvrde.classList.remove('active');
});


});
