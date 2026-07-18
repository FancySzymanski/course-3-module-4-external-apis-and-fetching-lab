// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

function displayAlerts(data) {
    const alerts = document.getElementById("alerts-display");
    const errorDisplay = document.getElementById("error-message")
    
    alerts.innerHTML = "";
    errorDisplay.textContent = ""
    errorDisplay.classList.add("hidden")

    const summary = document.createElement("p");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alerts.appendChild(summary);

    const ul = document.createElement("ul");
    data.features.forEach(function (alert) {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });
    alerts.appendChild(ul);
}

function displayError(message) {
    const errorDisplay = document.getElementById("error-message");
    errorDisplay.textContent = message;
    errorDisplay.classList.remove("hidden");
}

document.getElementById("fetch-alerts").addEventListener("click", function () {
    const stateInput = document.getElementById("state-input");
    const stateAbbv = stateInput.value.toUpperCase()

    if (stateAbbv.trim()==="") {
        displayError("Please enter a state abbreviation.")
        stateInput.value = "";
        return
    }
    fetchWeatherAlerts(stateAbbv);
    stateInput.value = "";
});

function fetchWeatherAlerts(stateAbbv) 
{fetch(`${weatherApi}${stateAbbv}`)
       .then(function (response) {
        if (!response.ok){
            throw new Error("Unable to fetch alerts. Please check the state abbreviations")
        }
        return response.json();
    })
    .then(function (data) {
        displayAlerts(data);
    })
    .catch(function (error) {
        displayError(error.message);
    });
}