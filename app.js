//run on window load
window.addEventListener("load", () => {
  //connect markup elements to variables using query selectors
  let dateUpdatedEl = document.querySelector(".date-updated");
  let populationEl = document.querySelector(".population");
  let locationEl = document.querySelector(".location");
  let totalCasesEl = document.querySelector(".total-cases");
  let totalDeathsEl = document.querySelector(".total-deaths");
  let newCasesEl = document.querySelector(".new-cases");
  let infectionRateEl = document.querySelector(".infection-rate");
  let caseDensityEl = document.querySelector(".case-density");
  let hospitalCapacityEl = document.querySelector(".hospital-capacity");
  let hospitalCovidUsageEl = document.querySelector(".hospital-covid-usage");
  let hospitalTotalUsageEl = document.querySelector(".hospital-total-usage");
  let icuCapacityEl = document.querySelector(".icu-capacity");
  let icuCovidUsageEl = document.querySelector(".icu-covid-usage");
  let icuTotalUsageEl = document.querySelector(".icu-total-usage");
  //variables for API request
  const apiKey = "1e93c10c57714916ac56744d86a5e208";
  const api = `https://api.covidactnow.org/v2/county/06097.json?apiKey=${apiKey}`;
  //function to round values to a desired precision
  let round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  //API request
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //variables to pull out data from API response
      let { county, state, country, population, lastUpdatedDate } = data;
      let { cases, deaths, newCases } = data.actuals;
      let {
        capacity,
        currentUsageCovid,
        currentUsageTotal,
      } = data.actuals.hospitalBeds;
      let icuCapacity = data.actuals.icuBeds.capacity;
      let icuUsageCovid = data.actuals.icuBeds.currentUsageCovid;
      let icuUsageTotal = data.actuals.icuBeds.currentUsageTotal;
      let { infectionRate, caseDensity } = data.metrics;
      let location = county + ", " + state + ", " + country;
      //inject extracted data into markup
      dateUpdatedEl.innerHTML = "Date Update: " + lastUpdatedDate;
      locationEl.innerHTML = location;
      populationEl.innerHTML = "Population: " + population;
      totalCasesEl.innerHTML = "Total Cases: " + cases;
      totalDeathsEl.innerHTML = "Total Deaths: " + deaths;
      newCasesEl.innerHTML = "New Cases: " + newCases;
      infectionRateEl.innerHTML = "Infection Rate: " + round(infectionRate, 2);
      caseDensityEl.innerHTML = "Case Density: " + round(caseDensity, 2);
      hospitalCapacityEl.innerHTML = "Total Hospital Beds: " + capacity;
      hospitalCovidUsageEl.innerHTML =
        "Hospital Beds in Use (Covid-19): " + currentUsageCovid;
      hospitalTotalUsageEl.innerHTML =
        "Hospital Beds in Use (Total): " + currentUsageTotal;
      icuCapacityEl.innerHTML = "Total ICU Beds: " + icuCapacity;
      icuCovidUsageEl.innerHTML =
        "ICU Beds in Use (Covid-19): " + icuUsageCovid;
      icuTotalUsageEl.innerHTML = "ICU Beds in Use (Total)" + icuUsageTotal;
    });
});
