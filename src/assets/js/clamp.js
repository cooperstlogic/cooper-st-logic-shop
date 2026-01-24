/**
 * CONTENTS NAVIGATION
 *
 * PHYSICALISM: The C-icon and CONTENTS label provide navigation to the
 * table of contents, with behavior that respects the physical book metaphor.
 *
 * Full Width View (both pages visible, >= 1250px):
 *   - Clicking navigates directly to THE SHOP page
 *
 * Single Page View (one page visible, < 1250px):
 *   - Clicking toggles the TOC display on the CURRENT page (no navigation)
 *   - TOC is shown with a "flip" animation effect
 */
document.addEventListener("DOMContentLoaded", () => {
  const contentsLinks = document.querySelectorAll("[data-contents-nav]");

  // Media queries for breakpoint detection
  const singlePageQuery = window.matchMedia("(max-width: 1250px)");
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  // Check if we're in single-page view (either breakpoint)
  const isSinglePageView = () => singlePageQuery.matches || mobileQuery.matches;

  contentsLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (isSinglePageView()) {
        // SINGLE PAGE VIEW: Toggle TOC display on current page
        const currentFlip = document.body.getAttribute("data-flip");
        if (currentFlip === "toc") {
          document.body.removeAttribute("data-flip");
        } else {
          document.body.setAttribute("data-flip", "toc");
        }
      } else {
        // FULL WIDTH VIEW: Navigate directly to THE SHOP
        window.location.href = "/shop/";
      }
    });
  });

  // Handle breakpoint changes: reset flip state when returning to full width
  const handleBreakpointChange = (e) => {
    if (!e.matches) {
      // Crossed OUT of single-page view: remove flip state
      document.body.removeAttribute("data-flip");
    }
  };

  singlePageQuery.addEventListener("change", handleBreakpointChange);

  /**
   * SWIPE GESTURE NAVIGATION
   * Allows "turning pages" on touch devices by swiping left/right.
   */
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Thresholds:
    // 1. Min Horizontal Swipe: > 50px (prevents accidental taps)
    // 2. Max Vertical Variance: < 50px (prevents triggering during scrolling)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      
      // Helper to find the first VISIBLE arrow
      const findVisibleArrow = (selector) => {
        const arrows = Array.from(document.querySelectorAll(selector));
        return arrows.find(arrow => arrow.offsetParent !== null); // offsetParent is null if hidden
      };

      if (deltaX < 0) {
        // SWIPE LEFT -> NEXT PAGE
        const nextLink = findVisibleArrow('.footer-nav-arrow[aria-label="Next Page"]');
        if (nextLink) window.location.href = nextLink.getAttribute('href');
      } 
      
      if (deltaX > 0) {
        // SWIPE RIGHT -> PREVIOUS PAGE
        const prevLink = findVisibleArrow('.footer-nav-arrow[aria-label="Previous Page"]');
        if (prevLink) window.location.href = prevLink.getAttribute('href');
      }
    }
  }
});
