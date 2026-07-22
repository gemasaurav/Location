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
/* ==========================================
   ONLINE SEARCH
========================================== */

async function searchLocation(place) {

    loading.innerHTML = "🔍 Searching...";

    resultCard.innerHTML = "";

    try {

        const response = await fetch(

            "https://nominatim.openstreetmap.org/search?format=jsonv2&q=" +

            encodeURIComponent(place)

        );

        const data = await response.json();

        if (data.length === 0) {

            loading.innerHTML = "❌ Location not found.";

            return;

        }

        const lat = data[0].lat;

        const lon = data[0].lon;

        getLocationDetails(lat, lon);

    }

    catch (error) {

        console.log(error);

        loading.innerHTML = "❌ Error searching location.";

    }

}

/* ==========================================
   GET COMPLETE LOCATION DETAILS
========================================== */

async function getLocationDetails(lat, lon) {

    loading.innerHTML = "📍 Loading Details...";

    try {

        const response = await fetch(

            "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +

            lat +

            "&lon=" +

            lon

        );

        const data = await response.json();

        showLocation(data);

    }

    catch (error) {

        console.log(error);

        loading.innerHTML = "❌ Unable to fetch details.";

    }

}
/* ==========================================
   SHOW LOCATION DETAILS
========================================== */

function showLocation(data) {
alert("showLocation is working");
console.log(data);
    loading.innerHTML = "";

    const address = data.address || {};

    const area =
        address.suburb ||
        address.neighbourhood ||
        address.village ||
        address.hamlet ||
        address.quarter ||
        "N/A";

    const district =
        address.county ||
        address.city_district ||
        address.district ||
        "N/A";

    const state =
        address.state || "N/A";

    const country =
        address.country || "N/A";

    const postcode =
        address.postcode || "N/A";

    const latitude =
        data.lat || "N/A";

    const longitude =
        data.lon || "N/A";

    const mapLink =
        "https://www.google.com/maps?q=" +
        latitude +
        "," +
        longitude;

    resultCard.innerHTML = `

<h2>📍 ${data.display_name}</h2>

<hr>

<p><b>🏡 Area :</b> ${area}</p>

<p><b>🏛 District :</b> ${district}</p>

<p><b>🌆 State :</b> ${state}</p>

<p><b>🌍 Country :</b> ${country}</p>

<p><b>📮 PIN Code :</b> ${postcode}</p>

<p><b>📌 Latitude :</b> ${latitude}</p>

<p><b>📌 Longitude :</b> ${longitude}</p>

<p>

<a href="${mapLink}" target="_blank">

🗺 Open in Google Maps

</a>

</p>

`;

}
