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
  let hospitalRemainingEl = document.querySelector(".hospital-remaining");
  let icuCapacityEl = document.querySelector(".icu-capacity");
  let icuCovidUsageEl = document.querySelector(".icu-covid-usage");
  let icuTotalUsageEl = document.querySelector(".icu-total-usage");
  let icuRemainingEl = document.querySelector(".icu-remaining");
  let searchInput = document.querySelector(".search-input");
  let searchButton = document.querySelector(".search-button");
  //variables for API request
  const apiKey = "1e93c10c57714916ac56744d86a5e208";
  const api = `https://api.covidactnow.org/v2/county/06097.json?apiKey=${apiKey}`;
  const testApi = `https://api.covidactnow.org/v2/counties.json?apiKey=${apiKey}`;
  //function to round values to a desired precision
  let round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  //function to format date
  let formatDate = (date) => {
    let dateString = date;
    let formattedDate = new Date(dateString);
    formattedDate.setDate(formattedDate.getDate() + 1);
    return (
      formattedDate.getMonth() +
      1 +
      "/" +
      formattedDate.getDate() +
      "/" +
      formattedDate.getFullYear()
    );
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
      dateUpdatedEl.innerHTML = "Date Update: " + formatDate(lastUpdatedDate);
      locationEl.innerHTML = location;
      populationEl.innerHTML = "Population: " + population.toLocaleString();
      totalCasesEl.innerHTML = "Total Cases: " + cases.toLocaleString();
      totalDeathsEl.innerHTML = "Total Deaths: " + deaths.toLocaleString();
      newCasesEl.innerHTML = "New Cases: " + newCases.toLocaleString();
      infectionRateEl.innerHTML = "Infection Rate: " + round(infectionRate, 2);
      caseDensityEl.innerHTML = "Case Density: " + round(caseDensity, 2);
      hospitalCapacityEl.innerHTML =
        "Total Hospital Beds: " + capacity.toLocaleString();
      hospitalCovidUsageEl.innerHTML =
        "Hospital Beds in Use (Covid-19): " +
        currentUsageCovid.toLocaleString();
      hospitalTotalUsageEl.innerHTML =
        "Hospital Beds in Use (Total): " + currentUsageTotal.toLocaleString();
      hospitalRemainingEl.innerHTML =
        "Hospital Beds Remaining: " + (capacity - currentUsageTotal);
      icuCapacityEl.innerHTML =
        "Total ICU Beds: " + icuCapacity.toLocaleString();
      icuCovidUsageEl.innerHTML =
        "ICU Beds in Use (Covid-19): " + icuUsageCovid.toLocaleString();
      icuTotalUsageEl.innerHTML =
        "ICU Beds in Use (Total): " + icuUsageTotal.toLocaleString();
      icuRemainingEl.innerHTML =
        "ICU Beds Remaining: " + (icuCapacity - icuUsageTotal);
    });
  fetch(testApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for(i = 0; i< data.length; i++){
        console.log(data[i].county);
      }
    });

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(searchInput.value);
    searchInput.value = "";
  });
});
