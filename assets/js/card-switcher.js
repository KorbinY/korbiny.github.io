function initPaperCardHover() {
  var cards = document.querySelectorAll(".d-none.d-md-block .row.no-gutters");

  cards.forEach(function(card) {
    let hoverTimer;
    let leaveTimer;

    // define transition styles
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease";
    card.style.transformOrigin = "center center";
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)"; // default no shadow

    card.addEventListener("mouseenter", function() {
      // reset leave timer
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }

      // 1s trigger hover effect
      hoverTimer = setTimeout(function() {
        card.style.transform = "scale(1.2) translateY(-10px)"; // enlarge and lift 10px
        card.style.zIndex = 1000; // lift z index
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)"; // add shadow
        hoverTimer = null;
      }, 1000);
    });

    card.addEventListener("mouseleave", function() {
      // reset hover timer
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }

      // 0.3s resume
      leaveTimer = setTimeout(function() {
        card.style.transform = "scale(1) translateY(0)";
        card.style.zIndex = ""; // z index reset
        card.style.boxShadow = "0 0 0 rgba(0,0,0,0)"; // remove shadow
        leaveTimer = null;
      }, 300);
    });
  });
}

document.addEventListener("DOMContentLoaded", initPaperCardHover);
