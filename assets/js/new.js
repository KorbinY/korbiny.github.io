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

    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        // switch to the second image
        img.setAttribute("src", altSrc);

        // update tooltip caption and keep it visible
        if (altCaption) {
          img.setAttribute("title", altCaption);
          if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
            $(img).tooltip('dispose').tooltip({trigger: 'manual'}).tooltip('show');
          }
        }
      }, 3000);
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);

      // revert to the original image
      img.setAttribute("src", originalSrc);

      // restore original tooltip caption
      if (originalCaption) {
        img.setAttribute("title", originalCaption);
        if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
          $(img).tooltip('dispose').tooltip({trigger: 'manual'}).tooltip('show');
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);
