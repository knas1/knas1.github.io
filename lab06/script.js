const initialLikes = 99;
let likesCounterElem = document.getElementById("likesCount");
let likeBtn = document.getElementById("likebtn");
let disLikeBtn = document.getElementById("dislikebtn");

count = initialLikes ;
likesCounterElem.innerText = count;

function doLike() {
  likeBtn.disabled = true;
  disLikeBtn.disabled = true;
  count++;
  likesCounterElem.innerText = count;
  document.getElementById("message").innerText="You liked this!";
}

function doDislike() {
  likeBtn.disabled = true;
  disLikeBtn.disabled = true;
  count--;
  likesCounterElem.innerText = count;
  document.getElementById("message").innerText="You disliked this!";
}
