document.addEventListener("DOMContentLoaded", function() {
    // open log button
    const modal = document.getElementById("formModal");
    const openBtns = document.querySelectorAll(".open-form-btn");
    const closeBtn = document.getElementById("closeFormBtn");

    if (modal && openBtns.length > 0) {
        openBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                modal.showModal();
            });
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", function() {
            modal.close();
        });
    }
});

document.addEventListener('DOMContentLoaded',() => {
 const searchBar = document.getElementById('mediaSearch');
  
  if(searchBar){
    searchBar.addEventListener('keyup', ()=>{
      const input = searchBar.value.toLowerCase();
      const cards = document.getElementsByClassName('card');

      for (let i = 0; i < cards.length; i++) {
        // We search all text inside the card (Title, Author, Genre)
        const cardText = cards[i].innerText.toLowerCase();
                
        if (cardText.includes(input)) {
          cards[i].style.display = "";
        } 
        else {
          cards[i].style.display = "none";
        }
      }
    });
  }
    
});

