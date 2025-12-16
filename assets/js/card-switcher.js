function initPaperCardHover() {
  var cards = document.querySelectorAll(".d-none.d-md-block .row.no-gutters");

  cards.forEach(function(card) {
    let hoverTimer;
    let leaveTimer;

    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease, background-color 0.3s ease";
    card.style.transformOrigin = "center center";
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
    card.style.backgroundColor = ""; 

    card.addEventListener("mouseenter", function() {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }

      hoverTimer = setTimeout(function() {
        card.style.transform = "scale(1.2) translateY(-10px)";
        card.style.zIndex = 1000;
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
        card.style.backgroundColor = "rgba(211, 211, 211, 0.9)"; // light gray 90% opacity
        hoverTimer = null;
      }, 1000);
    });

    card.addEventListener("mouseleave", function() {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }

      leaveTimer = setTimeout(function() {
        card.style.transform = "scale(1) translateY(0)";
        card.style.zIndex = "";
        card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        card.style.backgroundColor = ""; // restore original
        leaveTimer = null;
      }, 300);
    });
  });
}

document.addEventListener("DOMContentLoaded", initPaperCardHover);
