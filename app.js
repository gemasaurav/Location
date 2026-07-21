const resultCard =
document.getElementById("resultCard");

const loading =
document.getElementById("loading");

const searchBtn =
document.getElementById("searchBtn");

const currentLocationBtn =
document.getElementById("currentLocationBtn");

/* ==========================
SEARCH LOCATION
========================== */

async function searchLocation(query){

loading.innerHTML="Searching...";

resultCard.style.display="none";

try{

const response =
await fetch(

"https://geocode.maps.co/search?q="+
encodeURIComponent(query)+
"&api_key="

);

const data =
await response.json();

if(!data || data.length===0){

loading.innerHTML="Location Not Found";

return;

}

const place = data[0];

const reverse =
await fetch(

"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+
place.lat+
"&lon="+
place.lon

);

const reverseData =
await reverse.json();

showResult(

{

display_name:
reverseData.display_name,

lat:
place.lat,

lon:
place.lon,

address:
reverseData.address

}

);

}

catch(error){

console.log(error);

loading.innerHTML="Unable to fetch location";

}

}

/* ==========================
SHOW RESULT CARD
========================== */

function showResult(place){

loading.innerHTML="";

resultCard.style.display="block";

const address =
place.address || {};

resultCard.innerHTML=

`

<h2>

📍 ${place.display_name}

</h2>

<div class="resultItem">

<b>Area :</b>

${address.suburb ||

address.neighbourhood ||

address.village ||

address.hamlet ||

"N/A"}

</div>

<div class="resultItem">

<b>District :</b>

${address.county ||

address.city_district ||

"N/A"}

</div>

<div class="resultItem">

<b>State :</b>

${address.state ||

"N/A"}

</div>

<div class="resultItem">

<b>Country :</b>

${address.country ||

"N/A"}

</div>

<div class="resultItem">

<b>PIN Code :</b>

${address.postcode ||

"N/A"}

</div>

<div class="resultItem">

<b>Latitude :</b>

${place.lat}

</div>

<div class="resultItem">

<b>Longitude :</b>

${place.lon}

</div>

`;
}
/* ==========================
SEARCH BUTTON
========================== */

searchBtn.addEventListener(

"click",

function(){

const query =

document.getElementById("searchInput").value.trim();

if(query===""){

alert("Please enter a location.");

return;

}

searchLocation(query);

}

);

/* ==========================
CURRENT LOCATION
========================== */

currentLocationBtn.addEventListener(

"click",

function(){

if(!navigator.geolocation){

alert("Geolocation not supported");

return;

}

loading.innerHTML="Getting Current Location...";

navigator.geolocation.getCurrentPosition(

async function(position){

const lat =

position.coords.latitude;

const lon =

position.coords.longitude;

try{

const response =

await fetch(

"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+

lat+

"&lon="+

lon

);

const data =

await response.json();

showResult(data);

}

catch(error){

console.log(error);

loading.innerHTML="Unable to fetch current location";

}

},

function(){

loading.innerHTML="Permission Denied";

}

);

}

/* ==========================
FUTURE MODULES
==============

Version 1.5

• Continent
• Railway Station
• Airport
• Police Station
• Tourist Places
• Google Maps Button

========================== */
