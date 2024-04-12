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
    }
    
    for (var i = 0; i < ikoniceContainers.length; i++) {
        ikoniceContainers[i].addEventListener('click', function(event) {
            var klknuto = event.currentTarget;
            promeniBoju(klknuto);
        });
    }
    
    var defaultSelectedIcon = document.getElementById('btnPocetna');
    promeniBoju(defaultSelectedIcon);

    // otvori pop up

    document.getElementById('popup-trigger').addEventListener('click', function() {
      var popup = document.getElementById('popup');
      popup.style.display = 'block';
      setTimeout(function() {
        popup.style.opacity = '1';
      }, 10);
    });
    
    document.getElementById('popup-close').addEventListener('click', function() {
      var popup = document.getElementById('popup');
      popup.style.opacity = '0';
      setTimeout(function() {
        popup.style.display = 'none';
      }, 300);
    });
    

    //DROPDOWN ZA TRAZENJE KNJIGA

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(raw => raw.json())
  .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities).slice(0, 20); // Limiting to 5 rows
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

});
