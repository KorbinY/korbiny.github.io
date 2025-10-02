function initPortraitSwitchers() {
  var containers = document.querySelectorAll(".portrait-block");

  containers.forEach(function(container) {
    var img = container.querySelector(".portrait-img");
    if (!img) return;

    var originalSrc = container.getAttribute("data-original");
    var altSrc = container.getAttribute("data-alt");
    var originalCaption = container.getAttribute("data-caption-original");
    var altCaption = container.getAttribute("data-caption-alt");
    if (!altSrc) return;

    var hoverTimer;

    // PC: mouse enter/leave
    container.addEventListener("mouseenter", function() {
      hoverTimer = setTimeout(function() {
        switchToAlt(img, altSrc, altCaption);
      }, 3000);
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);
      switchToOriginal(img, originalSrc, originalCaption);
    });

    // Mobile: touchstart/touchend (long press behavior)
    container.addEventListener("touchstart", function() {
      hoverTimer = setTimeout(function() {
        switchToAlt(img, altSrc, altCaption);
      }, 3000);
    });

    container.addEventListener("touchend", function() {
      clearTimeout(hoverTimer);
      switchToOriginal(img, originalSrc, originalCaption);
    });
  });

  function switchToAlt(img, src, caption) {
    img.setAttribute("src", src);
    if (caption) {
      img.setAttribute("title", caption);
      if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
        $(img).tooltip('dispose').tooltip({ trigger: 'hover' }).tooltip('show');
      }
    }
  }

  function switchToOriginal(img, src, caption) {
    img.setAttribute("src", src);
    if (caption) {
      img.setAttribute("title", caption);
      if (typeof $ !== "undefined" && typeof $(img).tooltip === "function") {
        $(img).tooltip('dispose').tooltip({ trigger: 'hover' });
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);
