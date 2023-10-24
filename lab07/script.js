const btnXHR = document.getElementById('xhrSearch')
const btnFetch = document.getElementById('fetchSearch')
const btnFetchAsyncAwait = document.getElementById('fetchAsyncAwait')

let searchQueryElem = document.getElementById('query')
let searchResults = document.getElementById('SearchResults')

const API_URL = 'https://api.unsplash.com/search/photos'; 
const ACCESS_KEY = 'YI3-JYONMu_5dvBTLQ4mliSvklZdcmcDHnY5VqxC_Gw';

btnXHR.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingXHR(searchQueryElem.value);
});

btnFetch.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingFetch(searchQueryElem.value);
});

btnFetchAsyncAwait.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingFetchAsyncAwait(searchQueryElem.value);
});

function searchUsingXHR(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayResults(JSON.parse(xhr.responseText));
        }
    });
    let params = `client_id=${ACCESS_KEY}&query=${query}&per_page=5`; // Update parameters
    xhr.open('GET', `${API_URL}?${params}`);
    xhr.send();
}

function searchUsingFetch(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let params = {
        client_id: ACCESS_KEY,
        query: query,
        per_page: 5 // Update parameters
    };
    fetch(`${API_URL}?${new URLSearchParams(params)}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            displayResults(data.results);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function searchUsingFetchAsyncAwait(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let params = {
        client_id: ACCESS_KEY,
        query: query,
        per_page: 5 // Update parameters
    };
    let response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
    let data = await response.json();
    displayResults(data.results);
}

function displayResults(imageData) {
    for (let item of imageData) {
        let imageElement = document.createElement('img');
        imageElement.src = item.urls.regular;
        imageElement.alt = item.description;

        let infoElement = document.createElement('div');
        infoElement.innerHTML = `
            <p>Description: ${item.description}</p>
            <p>Creator: ${item.user.name}</p>
            <p>Location: ${item.location ? item.location.title : 'N/A'}</p>
            <p>Views: ${item.views}</p>
            <p>Tags: ${item.tags.map(tag => tag.title).join(', ')}</p>
        `;

        searchResults.appendChild(imageElement);
        searchResults.appendChild(infoElement);
    }
}
