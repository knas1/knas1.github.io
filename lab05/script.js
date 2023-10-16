var addPhotoBtn = document.getElementById('addPhotoBtn');

function createImgElement(photoURL) {
    var imgElem = document.createElement('img');
    imgElem.src = photoURL;
    imgElem.alt = 'The URL is not working';
    imgElem.style.width = '100%';
    return imgElem;
}

function addPhotoToGalleryDiv(imgElem) {
    var photoGalleryDiv = document.getElementById('photo-gallery');
    photoGalleryDiv.appendChild(imgElem);
}

function addDeleteButton(imgElem) {
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', function () {
        imgElem.remove();
        deleteButton.remove();
        // To allow uploading photos again
        addPhotoBtn.disabled = false;
        //Back to the default color
        addPhotoBtn.style.backgroundColor = '';
    });
    const photoGalleryDiv = document.getElementById('photo-gallery');
    photoGalleryDiv.appendChild(deleteButton);

}

function addZoomInButton(imgElem) {
    var zoomInButton = document.getElementById('zoomInBtn');
    zoomInButton.addEventListener('click', function () {
        var currentWidth = parseInt(imgElem.style.width, 10);
        imgElem.style.width = (currentWidth + 10) + '%';
    });
}

function addZoomOutButton(imgElem) {
    var zoomOutButton = document.getElementById('zoomOutBtn');
    zoomOutButton.addEventListener('click', function () {
        var currentWidth = parseInt(imgElem.style.width, 10);
        imgElem.style.width = (currentWidth - 10) + '%';
    });
}

function addPhoto() {
    var photoURL = prompt("Enter the URL of the photo");
    if (photoURL) {
        var imgElem = createImgElement(photoURL);
        addPhotoToGalleryDiv(imgElem);
        addDeleteButton(imgElem);
        addZoomInButton(imgElem);
        addZoomOutButton(imgElem);
        
        // To upload one photo at a time
        addPhotoBtn.disabled = true;
        addPhotoBtn.style.backgroundColor = 'gray';
    }
}

addPhotoBtn.addEventListener('click', addPhoto);
