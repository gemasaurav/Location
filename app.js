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

console.log(error);

loading.innerHTML="❌ "+error.message;

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
   SHOW LOCATION DETAILS
========================================== */

function showLocation(data){

loading.innerHTML="";

resultCard.innerHTML=`

<h1 style="color:red;">
IT WORKS
</h1>

<p>

${data.display_name}

</p>

`;

}
