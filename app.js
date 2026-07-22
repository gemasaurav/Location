/* ==========================================
   LOCATION APP
   Version 1.0
   Created for Gema
========================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const loading = document.getElementById("loading");
const resultCard = document.getElementById("resultCard");

/* ==========================================
   START
========================================== */

window.onload = function () {

    loading.innerHTML = "";
    resultCard.innerHTML = "";

};

/* ==========================================
   SEARCH BUTTON
========================================== */

searchBtn.addEventListener("click", function () {

    const place = searchInput.value.trim();

    if (place === "") {

        alert("Please enter a location.");
        return;

    }

    searchLocation(place);

});

/* ==========================================
   SEARCH LOCATION FUNCTION
========================================== */

async function searchLocation(place) {

    loading.innerHTML = "🔍 Searching...";

    resultCard.innerHTML = "";

}
