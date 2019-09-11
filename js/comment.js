const commentArea = document.querySelector('.form-control');
const commentSection = document.querySelector('.comment-container');
const publish = document.querySelector('.btn-default');

commentArea.onclick = function() {
  commentSection.classList.toggle('toggled');
}

publish.onclick = function() {
  commentSection.classList.remove('toggled');
}

window.onclick = function(e) {
  if (e.target !== commentArea) {
    commentSection.classList.remove('toggled');
  }
}