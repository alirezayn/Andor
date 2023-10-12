const getFetchUrl = async (url) => {
  let request = await fetch(url);
  const response = await request.json();
  return response;
};
let residentsUrl = 0;

let page = 1;
var url = `https://swapi.dev/api/planets/?page=${page}`;

const characterHandler = async (planet) => {
  if (!document.getElementById(`${planet} characters`)) {
    const urls = `https://swapi.dev/api/planets/?search=${planet}`;
    let data = await getFetchUrl(urls);
    let resident = data.results.map((item) => item.residents);
    resident.map((value) => {
      // if(!document.getElementById('noResident')){
      //   if(value == 0 ){
      //     let span = document.createElement('span')
      //     span.id = "noResident"
      //     let text = document.createTextNode('no resident')
      //     span.appendChild(text)
      //     return document.getElementById(planet).appendChild(span)
      //   }
      // }
      return value.map((url) => {
        async function character() {
          let char = url ? await getFetchUrl(url) : console.log(false);
          let div = document.createElement("div");
          div.id = planet + " characters";
          div.classList = "flex column";
          document.getElementById(planet).appendChild(div);
          let span = document.createElement("span");
          span.id = char.name;
          let name = document.createTextNode(char.name);
          span.appendChild(name);
          return document
          .getElementById(`${planet} characters`)
          .appendChild(span);
          
        }
        return character();
      });
    });
  }
};

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
          // residentsUrl.push({planet:item.name,resident:item.residents});
          return `
          <div id="${item.name}" class="flex column tabcontent">
            <h3>${item.rotation_period}</h3>
            <p>${item.name} is the capital city of England.</p>
           
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
