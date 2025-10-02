function initPortraitSwitchers() {
  var containers = document.querySelectorAll(".portrait-block");

  containers.forEach(function(container) {
    var img = container.querySelector(".portrait-img");
    var link = container.querySelector(".portrait-link");
    if (!img) return;

    // Get attributes for original and alternative states
    var originalSrc = container.getAttribute("data-original");
    var altSrc = container.getAttribute("data-alt");
    var originalCaption = container.getAttribute("data-caption-original");
    var altCaption = container.getAttribute("data-caption-alt");
    var originalForward = container.getAttribute("data-forward-original");
    var altForward = container.getAttribute("data-forward-alt");

    if (!altSrc) return; // skip if no second portrait provided

    var hoverTimer;

    // Initialize tooltip if jQuery/Bootstrap tooltip is available
    if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
      $(img).tooltip({ trigger: 'hover' });
    }

    // Initialize link with original forward URL (if any)
    if (link && originalForward) {
      link.setAttribute("href", originalForward);
    } else if (link) {
      link.removeAttribute("href");
    }

    // Handle mouse enter (hover start)
    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        // Switch to the alternative image
        img.setAttribute("src", altSrc);

        // Update caption (tooltip title)
        if (altCaption) {
          img.setAttribute("title", altCaption);
          if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
            $(img).tooltip('dispose').tooltip({ trigger: 'hover' }).tooltip('show');
          }
        }

        // Update link
        if (link) {
          if (altForward) {
            link.setAttribute("href", altForward);
          } else if (originalForward) {
            // fallback to original if altForward not provided
            link.setAttribute("href", originalForward);
          } else {
            link.removeAttribute("href");
          }
        }
      }, 3000); // delay before switching
    });

    // Handle mouse leave (hover end)
    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);

      // Revert to the original image
      img.setAttribute("src", originalSrc);

      // Restore original caption (tooltip title)
      if (originalCaption) {
        img.setAttribute("title", originalCaption);
        if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
          $(img).tooltip('dispose').tooltip({ trigger: 'hover' });
        }
      }

      // Restore original link
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
