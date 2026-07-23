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
   SEARCH LOCATION (Geoapify)
========================================== */

async function searchLocation(place){

loading.innerHTML="🔍 Searching...";

resultCard.innerHTML="";

try{

const url=
`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&format=json&apiKey=d8cceaa337004016a2773a118be711d6`;

const response=await fetch(url);

const data=await response.json();

if(!data.results || data.results.length==0){

loading.innerHTML="❌ Location not found.";

return;

}

showLocation(data.results[0]);

}

catch(error){

loading.innerHTML = `
<h3 style="color:red;">ERROR</h3>
<p>${error.name}</p>
<p>${error.message}</p>
<p>${navigator.userAgent}</p>
`;

alert(error.name + "\n" + error.message);

}

}
/* ==========================================
   ONLINE SEARCH
========================================== */

async function searchLocation(place) {

    loading.innerHTML = "🔍 Searching...";

    resultCard.innerHTML = "";

    try {

        const response = await fetch(

"https://nominatim.openstreetmap.org/search?format=json&q=" +

encodeURIComponent(place),

{

headers:{

"Accept":"application/json"

}

}

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

    alert(error);

    loading.innerHTML = error;

}

}

/* ==========================================
   GET COMPLETE LOCATION DETAILS
========================================== */

async function getLocationDetails(lat, lon) {

    loading.innerHTML = "📍 Loading Details...";

    try {

        const response = await fetch(

"https://nominatim.openstreetmap.org/reverse?format=json&lat="+

lat+

"&lon="+

lon,

{

headers:{

"Accept":"application/json"

}

}

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
   SHOW LOCATION
========================================== */

function showLocation(data){

loading.innerHTML="";

resultCard.innerHTML=`

<h2>📍 ${data.formatted}</h2>

<hr>

<p><b>🏡 Area :</b> ${data.suburb || data.village || data.hamlet || "N/A"}</p>

<p><b>🏛 District :</b> ${data.county || "N/A"}</p>

<p><b>🌆 State :</b> ${data.state || "N/A"}</p>

<p><b>🌍 Country :</b> ${data.country || "N/A"}</p>

<p><b>📮 PIN Code :</b> ${data.postcode || "N/A"}</p>

<p><b>🌎 Continent :</b> ${data.continent || "N/A"}</p>

<p><b>📌 Latitude :</b> ${data.lat}</p>

<p><b>📌 Longitude :</b> ${data.lon}</p>

<p>

<a href="https://www.google.com/maps?q=${data.lat},${data.lon}" target="_blank">

🗺 Open in Google Maps

</a>

</p>

`;

}
