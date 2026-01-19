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
  
  contentsLinks.forEach(link => {
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
});
