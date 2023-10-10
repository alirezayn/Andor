const getFetchUrl = async (url) => {
  let request = await fetch(url);
  const response = await request.json();
  return response;
};

let page = 1;
var url = `https://swapi.dev/api/planets/?page=${page}`;
const getPlanets = async () => {
  const planet = await getFetchUrl(url);
  let residents = planet.results.map((item) => item.residents);
  
  let planets = `
  <div class="tab flex spaceBetween">
        ${planet.results
          .map((item) => {
            return `<button id="${item.name + ' planets'}" class="tablinks" onclick="openCity(event, '${item.name}')">${item.name}</button>`;
          })
          .join("")}
      </div>
      ${planet.results
        .map((item) => {
          return `
          <div id="${item.name}" class="tabcontent">
            <h3>${item.rotation_period}</h3>
            <p>${item.name} is the capital city of England.</p>
          </div>
          `;
        })
        .join("")}
      
  `;
  if (planet.previous == null) {
    document.getElementById("prev").disabled = true;
  } else {
    document.getElementById("prev").disabled = false;
  }
  if (planet.next == null) {
    document.getElementById("next").disabled = true;
  } else {
    document.getElementById("next").disabled = false;
  }

  document.getElementById("planets").innerHTML = planets;

  document.getElementById(`${planet.results[0].name + ' planets'}`).click();
};
getPlanets();

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
