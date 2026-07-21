/* ==========================================
LOCATION APP
Version 1.0
Part A
========================================== */

const resultCard =
document.getElementById("resultCard");

const loading =
document.getElementById("loading");

const searchBtn =
document.getElementById("searchBtn");

const currentLocationBtn =
document.getElementById("currentLocationBtn");

const searchInput =
document.getElementById("searchInput");

/* ==========================================
SEARCH LOCATION
========================================== */

async function searchLocation(){

const query =
searchInput.value.trim();

if(query===""){

alert("Please enter a location.");

return;

}

loading.innerHTML="Searching...";

resultCard.style.display="none";

try{

const url =

"https://geocode.maps.co/search?q="+

encodeURIComponent(query);

const response =
await fetch(url);

if(!response.ok){

throw new Error("Server Error");

}

const data =
await response.json();

if(!Array.isArray(data) || data.length===0){

loading.innerHTML="Location not found.";

return;

}

const place =
data[0];

await getPlaceDetails(

place.lat,

place.lon

);

}

catch(error){

console.log(error);

loading.innerHTML=

"Unable to search location.";

}

}

/* ==========================================
GET DETAILS FROM LATITUDE/LONGITUDE
========================================== */

async function getPlaceDetails(

lat,

lon

){

const reverseURL =

"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+

lat+

"&lon="+

lon;

const reverseResponse =

await fetch(reverseURL);

if(!reverseResponse.ok){

throw new Error("Reverse lookup failed");

}

const reverseData =

await reverseResponse.json();

showResult(

reverseData

);

}
/* ==========================================
SHOW RESULT
========================================== */

function showResult(place){

loading.innerHTML="";

resultCard.style.display="block";

const address =
place.address || {};

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

const pincode =
address.postcode || "N/A";

const latitude =
place.lat || "N/A";

const longitude =
place.lon || "N/A";

const mapLink =

"https://www.google.com/maps?q="+

latitude+

","+

longitude;

resultCard.innerHTML=

`

<h2>

📍 ${place.display_name}

</h2>

<div class="resultItem">

<b>Area :</b>

${area}

</div>

<div class="resultItem">

<b>District :</b>

${district}

</div>

<div class="resultItem">

<b>State :</b>

${state}

</div>

<div class="resultItem">

<b>Country :</b>

${country}

</div>

<div class="resultItem">

<b>PIN Code :</b>

${pincode}

</div>

<div class="resultItem">

<b>Latitude :</b>

${latitude}

</div>

<div class="resultItem">

<b>Longitude :</b>

${longitude}

</div>

<div class="resultItem">

<a href="${mapLink}"

target="_blank">

🗺️ Open in Google Maps

</a>

</div>

`;

}
/* ==========================================
SEARCH BUTTON
========================================== */

searchBtn.addEventListener(

"click",

function(){

searchLocation();

}

/* ==========================================
CURRENT LOCATION
========================================== */

);

currentLocationBtn.addEventListener(

"click",

function(){

if(!navigator.geolocation){

alert("Geolocation is not supported.");

return;

}

loading.innerHTML="Getting Current Location...";

resultCard.style.display="none";

navigator.geolocation.getCurrentPosition(

async function(position){

const lat =

position.coords.latitude;

const lon =

position.coords.longitude;

try{

await getPlaceDetails(

lat,

lon

);

}

catch(error){

console.log(error);

loading.innerHTML=

"Unable to fetch current location.";

}

},

function(){

loading.innerHTML=

"Location permission denied.";

},

{

enableHighAccuracy:true,

timeout:15000,

maximumAge:0

}

);

}

/* ==========================================
FUTURE MODULES (Version 1.5)

✓ Continent
✓ Nearest Railway Station
✓ Nearest Airport
✓ Police Station
✓ Tourist Places
✓ Distance
✓ Weather
========================================== */
);
