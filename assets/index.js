const apiKey = "at_uCyWQB1CMJK6er6k08ECibdgrlUQg";

async function getIp() {
  const getValor = document.getElementById("searchIp").value;
  const getIpAddress = document.getElementById("ipaddress");
  const getCity = document.getElementById("city");
  const getTimeZone = document.getElementById("timezone");
  const getIsp = document.getElementById("isp");
  const getVpn = document.getElementById("vpn");

  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${getValor}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (document.getElementById("searchIp").value.length == 0) {
    alert("Input Empty");
  }

  getIpAddress.innerText = data.ip;
  getCity.innerText = data.location.city;
  getTimeZone.innerText = data.location.timezone;
  getIsp.innerText = data.isp;
  getVpn.innerText = data.proxy.vpn;
  const lat = data.location.lat;
  const lng = data.location.lng;

  let container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
  let map = L.map("map", {
    center: [lat, lng],
    zoom: 15,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ).addTo(map);
}

const boton = document
  .getElementById("formButton")
  .addEventListener("click", getIp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
