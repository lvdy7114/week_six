const API_KEY = "WQP3R5613AN3C4FP";

async function getStockData() {
    const symbol = document.querySelector('#symbol').value;
    const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );

    const data = await response.json(); 
    const currentPrice = data["Global Quote"]["05. price"];
    const higherPrice = data["Global Quote"]["03. high"];
    const lowerPrice = data["Global Quote"]["04. low"];
    document.querySelector('#current-price').innerText = `Current price: ${currentPrice} `
    document.querySelector('#high-price').innerText = `High price: ${higherPrice} `
    document.querySelector('#low-price').innerText = `Low price: ${lowerPrice} `
}

const fetchButton = document.querySelector("#fetchButton");
fetchButton.addEventListener("click", getStockData);