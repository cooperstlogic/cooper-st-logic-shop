/**
 * CONTENTS NAVIGATION
 * 
 * PHYSICALISM: The C-icon and CONTENTS label provide navigation to the 
 * table of contents, with behavior that respects the physical book metaphor.
 * 
 * Full Width View (both pages visible):
 *   - Clicking navigates directly to THE SHOP page
 * 
 * Single Page View (one page visible):
 *   - If on THE SHOP page: "flips" to show the TOC (left page)
 *   - If on any other page: navigates to THE SHOP with TOC visible
 */
document.addEventListener("DOMContentLoaded", () => {
  const contentsLinks = document.querySelectorAll("[data-contents-nav]");
  
  // Media queries for breakpoint detection
  const singlePageQuery = window.matchMedia("(max-width: 1250px)");
  const mobileQuery = window.matchMedia("(max-width: 900px)");
  
  // Check if we're in single-page view (either breakpoint)
  const isSinglePageView = () => singlePageQuery.matches || mobileQuery.matches;
  
  // Check if we're currently on THE SHOP page
  const isShopPage = () => window.location.pathname === "/shop/" || window.location.pathname === "/shop";
  
  // Check if we arrived with the TOC flip param
  const checkFlipParam = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("toc")) {
      document.body.setAttribute("data-flip", "toc");
      // Clean up the URL without reloading
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  };
  
  // Initialize: check for flip param on page load
  checkFlipParam();
  
  contentsLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      if (isSinglePageView()) {
        // SINGLE PAGE VIEW: Flip behavior
        if (isShopPage()) {
          // Already on THE SHOP - toggle the flip to show/hide TOC
          const currentFlip = document.body.getAttribute("data-flip");
          if (currentFlip === "toc") {
            document.body.removeAttribute("data-flip");
          } else {
            document.body.setAttribute("data-flip", "toc");
          }
        } else {
          // Navigate to THE SHOP with TOC visible
          window.location.href = "/shop/?toc";
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
