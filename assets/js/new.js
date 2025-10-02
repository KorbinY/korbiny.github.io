function initPortraitSwitchers() {
  var containers = document.querySelectorAll(".portrait-block");

  containers.forEach(function(container) {
    var img = container.querySelector(".portrait-img");
    if (!img) return;

    var originalSrc = container.getAttribute("data-original");
    var altSrc = container.getAttribute("data-alt");
    var originalCaption = container.getAttribute("data-caption-original");
    var altCaption = container.getAttribute("data-caption-alt");
    if (!altSrc) return; // skip if no second portrait

    var hoverTimer;

    // initialize tooltip in normal hover mode
    if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
      $(img).tooltip({ trigger: 'hover' });
    }

    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        // switch to the second image
        img.setAttribute("src", altSrc);

        // update caption (title) and refresh tooltip
        if (altCaption) {
          img.setAttribute("title", altCaption);
          if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
            $(img).tooltip('dispose').tooltip({ trigger: 'hover' }).tooltip('show');
          }
        }
      }, 3000);
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);

      // revert to the original image
      img.setAttribute("src", originalSrc);

      // restore original caption
      if (originalCaption) {
        img.setAttribute("title", originalCaption);
        if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
          $(img).tooltip('dispose').tooltip({ trigger: 'hover' });
          // no manual show here, so it will hide naturally on mouseleave
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);
