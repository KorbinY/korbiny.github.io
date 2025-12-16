function initPaperCardHover() {
  var cards = document.querySelectorAll(".d-none.d-md-block .row.no-gutters");

  cards.forEach(function(card) {
    let hoverTimer;
    let leaveTimer;

    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease, background-color 0.3s ease";
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
    card.style.backgroundColor = "";

    card.addEventListener("mouseenter", function() {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }

      const rect = card.getBoundingClientRect();
      const scale = 1.2;
      const dx = rect.width * (scale - 1);

      hoverTimer = setTimeout(function() {
        card.style.transition = "transform 0.1s ease, box-shadow 0.1s ease, z-index 0.1s ease, background-color 0.1s ease";
        card.style.transform = `translateX(-${dx}px) scale(${scale}) translateY(0)`;
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
        card.style.transform = "translateX(0) scale(1) translateY(0)";
        card.style.zIndex = "";
        card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        card.style.backgroundColor = "";
        leaveTimer = null;

        setTimeout(() => {
          card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease, background-color 0.3s ease";
        }, 100);
      }, 0);
    });
  });
}

document.addEventListener("DOMContentLoaded", initPaperCardHover);
