//const clientId = "ca6139e49c5bf36";
const clientId = "712645836bdd60b";
var defaultAlbumId = 'Jfni3';

function requestAlbum() {
    let albumId = document.getElementById("albumIdField").innerText;
    if(!albumId) {
        albumId = defaultAlbumId;
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processAlbumRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true);      
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function processAlbumRequest(response_text) {
    var respObj = JSON.parse(response_text);
    for (item of respObj.data.slice(0, 10)){
        console.log(item)
        requestImage(item.id);
    }
}

function requestImage(imageHash) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            processImageRequest(req.responseText);
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log("Error with the imgur API");
        }
    }
    req.open("GET", "https://api.imgur.com/3/image/" + imageHash, true);   
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function processImageRequest(response_text) {
    var respObj = JSON.parse(response_text);
    let imgElem = document.createElement("img");
    imgElem.src = respObj.data.link;
    document.body.appendChild(imgElem);
}


function requestAlbumUsingFetch() {
    let albumId = document.getElementById("albumIdField").innerText;
    if (!albumId) {
        albumId = defaultAlbumId;
    }

    fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + clientId,
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error with the imgur API');
        }
    })
    .then(data => {
        data.data.slice(0, 10).forEach(item => {
            requestImageUsingFetch(item.id);
        });
    })
    .catch(error => {
        console.log(error);
    });
}

function requestImageUsingFetch(imageHash) {
    fetch('https://api.imgur.com/3/image/' + imageHash, {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID ' + clientId,
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error with the imgur API');
        }
    })
    .then(data => {
        let imgElem = document.createElement("img");
        imgElem.src = data.data.link;
        document.body.appendChild(imgElem);
    })
    .catch(error => {
        console.log(error);
    });
}

async function requestAlbumUsingFetchAsyncAwait() {
    let albumId = document.getElementById("albumIdField").innerText;
    if (!albumId) {
        albumId = defaultAlbumId;
    }

    try {
        const response = await fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID ' + clientId,
            },
        });

        if (!response.ok) {
            throw new Error('Error with the imgur API');
        }

        const data = await response.json();

        data.data.slice(0, 10).forEach(item => {
            requestImageUsingFetchAsyncAwait(item.id);
        });
    } catch (error) {
        console.log(error);
    }
}

async function requestImageUsingFetchAsyncAwait(imageHash) {
    try {
        const response = await fetch('https://api.imgur.com/3/image/' + imageHash, {
            method: 'GET',
            headers: {
                'Authorization': 'Client-ID ' + clientId,
            },
        });

        if (!response.ok) {
            throw new Error('Error with the imgur API');
        }

        const data = await response.json();

        let imgElem = document.createElement("img");
        imgElem.src = data.data.link;
        document.body.appendChild(imgElem);
    } catch (error) {
        console.log(error);
    }
}


