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
        img.setAttribute("src", altSrc);
        if (altCaption) {
          img.setAttribute("title", altCaption);
        }
      }, 3000);
    });

    container.addEventListener("mouseleave", function() {
      clearTimeout(hoverTimer);
      img.setAttribute("src", originalSrc);
      if (originalCaption) {
        img.setAttribute("title", originalCaption);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initPortraitSwitchers);

