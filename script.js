document.addEventListener("DOMContentLoaded", function() {
    var ikoniceContainers = document.getElementsByClassName('ikonica-container');
    
    function applyStyles(clickedIconContainer) {
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
        
        clickedIconContainer.classList.add('clickedIcon');
        var deca = clickedIconContainer.nextElementSibling;
        if (deca && deca.classList.contains('ikonicaHover')) {
            var kocka = deca.querySelector('.kocka');
            var linija = deca.querySelector('.linija');
            
            if (kocka) {
                kocka.style.backgroundColor = "#3678fd"; // Set background color as desired
            }
            if (linija) {
                linija.style.backgroundColor = "#3678fd"; // Set background color as desired
            }
        }
    }
    
    for (var i = 0; i < ikoniceContainers.length; i++) {
        ikoniceContainers[i].addEventListener('click', function(event) {
            var clickedIconContainer = event.currentTarget;
            applyStyles(clickedIconContainer);
        });
    }
    
    // Apply default styles for the "POCETNA" page on page load
    var defaultSelectedIcon = document.getElementById('btnPocetna');
    applyStyles(defaultSelectedIcon);

    const input = document.querySelector(".finder__input");
const finder = document.querySelector(".finder");
const form = document.querySelector("form");

input.addEventListener("focus", () => {
  finder.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    finder.classList.remove("active");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  finder.classList.add("processing");
  finder.classList.remove("active");
  input.disabled = true;
  setTimeout(() => {
    finder.classList.remove("processing");
    input.disabled = false;
    if (input.value.length > 0) {
      finder.classList.add("active");
    }
  }, 1000);
});

});
