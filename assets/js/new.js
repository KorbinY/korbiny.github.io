function initPortraitSwitchers() {
  var containers = document.querySelectorAll(".portrait-block");

  containers.forEach(function(container) {
    var img = container.querySelector(".portrait-img");
    if (!img) return;

    var originalSrc = container.getAttribute("data-original");
    var altSrc = container.getAttribute("data-alt");
    var originalCaption = container.getAttribute("data-caption-original");
    var altCaption = container.getAttribute("data-caption-alt");
    if (!altSrc) return; // skip if no portrait_url2

    var hoverTimer;

    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        // go to image 2
        img.setAttribute("src", altSrc);
        // go to caption 2
        if (altCaption) {
          img.setAttribute("title", altCaption);
          // refresh tooltip, fit Bootstrap Tooltip
          if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
            $(img).tooltip('dispose').tooltip();
          }
        }
      }, 3000);
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);
      // go back to image 1
      img.setAttribute("src", originalSrc);
      // go back to caption 1
      if (originalCaption) {
        img.setAttribute("title", originalCaption);
        if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
          $(img).tooltip('dispose').tooltip();
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);
