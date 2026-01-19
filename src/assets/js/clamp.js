document.addEventListener("DOMContentLoaded", () => {
  const clamp = document.querySelector(".mobile-clamp");
  const sidebar = document.querySelector(".bench-sidebar");

  // Media Query for breakpoint detection (more performant than resize + setTimeout)
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  if (clamp && sidebar) {
    clamp.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate close
      
      if (mobileQuery.matches) {
        sidebar.classList.toggle("active");
        // Toggle body scroll lock when hamburger menu opens/closes
        document.body.classList.toggle("sidebar-open", sidebar.classList.contains("active"));
      } else {
        sidebar.classList.toggle("collapsed");
        document.body.classList.toggle("sidebar-collapsed");
      }
    });

    // Click outside to close (Mobile only)
    document.addEventListener("click", (e) => {
      if (mobileQuery.matches && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !clamp.contains(e.target)) {
          sidebar.classList.remove("active");
          document.body.classList.remove("sidebar-open");
        }
      }
    });

    // Breakpoint Change Handler using matchMedia (replaces resize + setTimeout debounce)
    // This is more performant and only fires when the breakpoint is actually crossed
    const handleBreakpointChange = (e) => {
      // Briefly disable transitions during breakpoint change
      document.body.classList.add("resizing");
      
      if (e.matches) {
        // Crossed INTO mobile: reset desktop state
        document.body.classList.remove("sidebar-collapsed");
        sidebar.classList.remove("collapsed");
        // Also ensure sidebar-open is removed
        document.body.classList.remove("sidebar-open");
        // Ensure sidebar is hidden (not active) when crossing to mobile
        sidebar.classList.remove("active");
      }
      
      // Re-enable transitions after a brief delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.classList.remove("resizing");
        });
      });
    };

    // Modern API: addEventListener on MediaQueryList
    mobileQuery.addEventListener("change", handleBreakpointChange);
  }
});
