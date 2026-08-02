function initPaperCardHover() {
  var cards = document.querySelectorAll(".d-none.d-md-block .row.no-gutters");
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canHover || reduceMotion) return;

  cards.forEach(function(card) {
    let hoverTimer;

    card.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        card.classList.add('paper-card-highlight');
        hoverTimer = null;
      }, 1000);
    });

    card.addEventListener("mouseleave", function() {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }

      card.classList.remove('paper-card-highlight');
    });
  });
}

document.addEventListener("DOMContentLoaded", initPaperCardHover);
