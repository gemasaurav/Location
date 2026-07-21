const resultCard =
document.getElementById("resultCard");

const loading =
document.getElementById("loading");

const searchBtn =
document.getElementById("searchBtn");

const currentLocationBtn =
document.getElementById("currentLocationBtn");

async function getLocation(query){

loading.innerHTML="Searching...";

resultCard.style.display="none";

try{

const response =
await fetch(
"https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q="

* encodeURIComponent(query)
  );

const data =
await response.json();

if(data.length==0){

loading.innerHTML="Location Not Found";

return;

}

showResult(data[0]);

}
catch(error){

console.log(error);

loading.innerHTML = "Error: " + error.message;

}

}

function showResult(place){

loading.innerHTML="";

resultCard.style.display="block";

const address =
place.address;

resultCard.innerHTML=

`

<h2>📍 ${place.display_name}</h2>

<div class="resultItem">

<b>Area :</b>

${address.suburb || address.neighbourhood || address.village || "N/A"}

</div>

<div class="resultItem">

<b>District :</b>

${address.county || address.city_district || "N/A"}

</div>

<div class="resultItem">

<b>State :</b>

${address.state || "N/A"}

</div>

<div class="resultItem">

<b>Country :</b>

${address.country || "N/A"}

</div>

<div class="resultItem">

<b>PIN Code :</b>

${address.postcode || "N/A"}

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

searchBtn.addEventListener(

"click",

function(){

const query=

document.getElementById("searchInput").value.trim();

if(query!=""){

getLocation(query);

}

}

);

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

const lat=

position.coords.latitude;

const lon=

position.coords.longitude;

const response=

await fetch(

"https://nominatim.openstreetmap.org/reverse?format=json&lat="

+lat+

"&lon="

+lon

);

const data=

await response.json();

showResult(data);

},

function(){

loading.innerHTML="Permission Denied";

}

);

});

