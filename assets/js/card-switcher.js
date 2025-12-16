function initPaperCardHover() {
  var cards = document.querySelectorAll(".d-none.d-md-block .row.no-gutters");

  cards.forEach(function(card) {
    let hoverTimer;
    let leaveTimer;

    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease, background-color 0.3s ease";
    card.style.transformOrigin = "right center"; // horizontal right, vertical center
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
    card.style.backgroundColor = "";

    card.addEventListener("mouseenter", function() {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }

      hoverTimer = setTimeout(function() {
        card.style.transform = "scale(1.2)"; // keep vertical center, right aligned
        card.style.zIndex = 1000;
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
        card.style.backgroundColor = "rgba(211, 211, 211, 0.9)";
        hoverTimer = null;
      }, 1000);
    });

    card.addEventListener("mouseleave", function() {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }

      leaveTimer = setTimeout(function() {
        card.style.transition = "transform 0.1s ease, box-shadow 0.1s ease, z-index 0.1s ease, background-color 0.1s ease";
        card.style.transform = "scale(1)";
        card.style.zIndex = "";
        card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        card.style.backgroundColor = "";
        leaveTimer = null;

        // restore transition to normal for next hover
        setTimeout(() => {
          card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease, background-color 0.3s ease";
        }, 100);
      }, 0);
    });
  });
}

document.addEventListener("DOMContentLoaded", initPaperCardHover);
