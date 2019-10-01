const modal = document.getElementById('myModal');
    const modalHeader = document.getElementsByClassName('modal-header');
    const button = document.querySelectorAll('.delete');
    const span = document.getElementsByClassName("close")[0];

    const allButtons = Array.from(button);

    allButtons.forEach(button =>{
      button.onclick = () => {
      modal.style.display = "block";
    }
    });

    span.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }