const commentArea = document.querySelector('.form-control');
const commentSection = document.querySelector('.comment-container');
const publish = document.querySelector('.btn-default');
const placeholder = document.querySelector('.placeholder');

const toggle = () => {
  commentSection.classList.toggle('toggled');
}

const untoggle = () => {
  commentSection.classList.remove('toggled');
}

publish.addEventListener('click', untoggle);
commentArea.addEventListener('click', toggle);

window.onclick = function(e) {
  if (e.target !== commentArea) {
    commentSection.classList.remove('toggled');
    if(commentArea.value.length > 0){
      commentArea.style.paddingLeft = '55px';
      commentArea.style.paddingTop = '20px';
      commentArea.style.color = 'black';
      placeholder.style.visibility = 'hidden';
    }
  }
}