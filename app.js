window.addEventListener("load", () => {
  let locationEl = document.querySelector(".location");
  let totalCasesEl = document.querySelector(".total-cases");
  let totalDeathsEl = document.querySelector(".total-deaths");
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "1e93c10c57714916ac56744d86a5e208";
  const api = `https://api.covidactnow.org/v2/county/06097.json?apiKey=${apiKey}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let { county, state, country } = data;
      let { cases, deaths } = data.actuals;
      let location = county + ", " + state + ", " + country;
      locationEl.innerHTML = location;
      totalCasesEl.innerHTML = "Total Cases: " + cases;
      totalDeathsEl.innerHTML = "Total Deaths: " + deaths;
    });
});
