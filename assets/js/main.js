"use strict";
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        nav.classList.toggle("open");
    });




"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* horizontal scroll */
  const stickyContainers = document.querySelectorAll(".horizontal_scroll");

  stickyContainers.forEach((stickyContainer) => {
    // get elements
    const stickyItem = stickyContainer.querySelector(".sticky");
    const scroller = stickyContainer.querySelector(".scroller");
    scroller.classList.add("nobar");

    // set sticky height
    const updateStickyHeight = () => {
      const stickyHeight = scroller.scrollWidth - scroller.clientWidth + stickyItem.clientHeight;
      stickyContainer.style.setProperty("--sticky-container-height", `${stickyHeight}px`);
    };
    updateStickyHeight();
    new ResizeObserver(updateStickyHeight).observe(scroller);
    new ResizeObserver(updateStickyHeight).observe(stickyItem);

    // sync scroll
    const syncScroll = () => {
      const rect = stickyContainer.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        scroller.scrollLeft = window.scrollY - stickyContainer.offsetTop;
      } else if (rect.bottom < window.innerHeight) {
        scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
      } else {
        scroller.scrollLeft = 0;
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", syncScroll, { passive: true });
            syncScroll();
          } else {
            window.removeEventListener("scroll", syncScroll);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(stickyContainer);

    // end of forEach
  });

  // end of DOMContentLoaded
});