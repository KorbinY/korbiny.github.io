function initPortraitSwitchers() {
  var containers = document.querySelectorAll(".portrait-block");

  containers.forEach(function(container) {
    var img = container.querySelector(".portrait-img");
    var link = container.querySelector(".portrait-link");
    if (!img) return;

    var originalSrc = container.getAttribute("data-original");
    var altSrc = container.getAttribute("data-alt");
    var originalCaption = container.getAttribute("data-caption-original");
    var altCaption = container.getAttribute("data-caption-alt");
    var originalForward = container.getAttribute("data-forward-original");
    var altForward = container.getAttribute("data-forward-alt");

    if (!altSrc) return;

    var hoverTimer;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
      $(img).tooltip({ trigger: 'hover' });
    }

    if (link && originalForward) {
      link.setAttribute("href", originalForward);
    } else if (link) {
      link.removeAttribute("href");
    }

    if (!canHover) return;

    var altImage = new Image();
    altImage.src = altSrc;

    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        img.setAttribute("src", altSrc);

        if (altCaption) {
          img.setAttribute("title", altCaption);
          if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
            $(img).tooltip('dispose').tooltip({ trigger: 'hover' }).tooltip('show');
          }
        }

        if (link) {
          if (altForward) {
            link.setAttribute("href", altForward);
          } else if (originalForward) {
            link.setAttribute("href", originalForward);
          } else {
            link.removeAttribute("href");
          }
        }
      }, 2000); // delay before switching
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);

      img.setAttribute("src", originalSrc);

      if (originalCaption) {
        img.setAttribute("title", originalCaption);
        if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
          $(img).tooltip('dispose').tooltip({ trigger: 'hover' });
        }
      }

      if (link) {
        if (originalForward) {
          link.setAttribute("href", originalForward);
        } else {
          link.removeAttribute("href");
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);
