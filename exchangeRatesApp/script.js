const firstSelect = document.querySelector("[data-first-select]");
const secondSelect = document.querySelector("[data-second-select]");
const comparisonInfo = document.querySelector("[data-comparison-info]");
const swap = document.querySelector("[data-swap-btn]");

const firstInput = document.querySelector("[data-first-input]");
const secondInput = document.querySelector("[data-second-input]");

let rates = {};

const BASE_URL = "https://open.er-api.com/v6/latest";
const FIRST_DEFAULT_CURRENCY = "USD";
const SECOND_DEFAULT_CURRENCY = "RUB";

firstSelect.addEventListener("change", () => updateExchangeRates());
secondSelect.addEventListener("change", () => renderInfo());

swap.addEventListener("click", () => {
    temp = firstSelect.value;
    firstSelect.value = secondSelect.value;
    secondSelect.value = temp;

    updateExchangeRates();
})

firstInput.addEventListener("input", () => {
    secondInput.value = firstInput.value * rates[secondSelect.value];
})
secondInput.addEventListener("input", () => {
    firstInput.value = secondInput.value / rates[secondSelect.value];
})

const updateExchangeRates = async () => {
    try {
        const response = await fetch(`${BASE_URL}/${firstSelect.value}`);
        const data = await response.json();

        rates = data.rates;

        renderInfo();
    } catch (error) {
        console.error(error.message);
    }
}

const renderInfo = () => {
    comparisonInfo.textContent = `1 ${firstSelect.value} = ${rates[secondSelect.value]} ${secondSelect.value}`;

    firstInput.value = rates[firstSelect.value];
    secondInput.value = rates[secondSelect.value];
}

const populateSelects = () => {
    firstSelect.innerHTML = "";
    secondSelect.innerHTML = "";
    for (const currency of Object.keys(rates)) {
        firstSelect.innerHTML += `
        <option value="${currency}" ${currency === FIRST_DEFAULT_CURRENCY ? "selected" : ""}>${currency}</option>`;

        secondSelect.innerHTML += `
        <option value="${currency}" ${currency === SECOND_DEFAULT_CURRENCY ? "selected" : ""}>${currency}</option>`;
    }
}

const getInitialRates = async () => {
    try {
        const response = await fetch(`${BASE_URL}/${FIRST_DEFAULT_CURRENCY}`);
        const data = await response.json();

        rates = data.rates;

        populateSelects();
        renderInfo();
    } catch (error) {
        console.error(error.message);
    }
}

getInitialRates();