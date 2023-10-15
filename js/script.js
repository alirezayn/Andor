
const publicKey = '2fb5e6107782fc48964c90effc9101c6';
const privateKey = '79c9338b1b1f2e3488f4c8af7573dcd088de5e68';
const apiBaseURL = "https://gateway.marvel.com/v1/public";
const ts = Date.now();
const hash = md5(ts + privateKey + publicKey)
// const params = new URLSearchParams({
//   ts:ts,
//   apikey:publicKey,
//   hash:md5(ts + privateKey + publicKey  )
// })

const hero_name = "black panther"
const marvel = `https://gateway.marvel.com:443/v1/public/characters?name=${hero_name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

// const endpoint = marvel + params
// console.log(endpoint)


const getFetchUrl = async (url) => {
  let request = await fetch(url);
  let response = await request.json();
  return response;
}
let page = 1;
var url = `https://swapi.dev/api/planets/?page=${page}`;

const getPlanets = async () => {
  const planet = await getFetchUrl(url);
  let planets = `
  <div class="tab flex spaceBetween">
        ${planet.results
          .map((item) => {
            return `<button id="${
              item.name + " planets"
            }" class="tablinks" onclick="openCity(event, '${
              item.name
            }');characterHandler('${item.name}')">${item.name}</button>`;
          })
          .join("")}
      </div>
      ${planet.results
        .map((item) => {
          return `
          <div id="${item.name}" class="flex column tabcontent">
          <img src="./images/planets/${
            item.name
          }.jpg" width="200" height="200" class="radius"/>
            <h3>${item.rotation_period}</h3>
            <p>${item.name} is the capital city of England.</p>
             <div id="${
               item.name + " characters"
             }" class="flex column characters">
             </div>
             <div id="${item.name + " film"}" class="flex column characters">
             </div>
          </div>
          `;
        })
        .join("")}
      
  `;
  // console.log(residentsUrl)
  document.getElementById("prev").disabled =
    planet.previous == null ? true : false;
  document.getElementById("next").disabled = planet.next == null ? true : false;
  document.getElementById("planets").innerHTML = planets;

  document.getElementById(`${planet.results[0].name + " planets"}`).click();
};

getPlanets();

const characterHandler = async (planets) => {
  const urls = `https://swapi.dev/api/planets/?search=${planets}`;
  let planet = await getFetchUrl(urls);
  let arrPlanet = planet.results[0];
  planet = await Promise.all(
    arrPlanet.residents.map((url) => {
      return getFetchUrl(url);
    })
  );
  let film = await Promise.all(
    arrPlanet.films.map((url) => {
      return getFetchUrl(url);
    })
  );
  // film.map(item=>console.log(item.title))
  document.getElementById(`${planets + " characters"}`).innerHTML =
    planet.length == 0
      ? "<span>no resident</span>"
      : planet
          .map((item) => {
            return `<span class="border">${item.name}</span>`;
          })
          .join("");

  document.getElementById(`${planets + " film"}`).innerHTML = film
    .map((item) => {
      return `<span>${item.title}</span>`;
    })
    .join("");
};

const getNextPlanets = () => {
  page += 1;
  url = `https://swapi.dev/api/planets/?page=${page}`;
  getPlanets();
};

const getPrevPlanets = () => {
  page -= 1;
  url = `https://swapi.dev/api/planets/?page=${page}`;
  getPlanets();
};

const activatedTab = (name) => {
  const box = document.getElementById(`${name.id}`);
  box.classList.add("activeList");
};

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// const myplanet = async ()=>{
//   console.log(character)
// }
// myplanet()
