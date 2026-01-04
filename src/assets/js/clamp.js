document.addEventListener("DOMContentLoaded", () => {
  const clamp = document.querySelector(".mobile-clamp");
  const sidebar = document.querySelector(".bench-sidebar");

  if (clamp && sidebar) {
    clamp.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate close
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      
      if (isMobile) {
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
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !clamp.contains(e.target)) {
          sidebar.classList.remove("active");
          document.body.classList.remove("sidebar-open");
        }
      }
    });

    // Resize Handler for State Management
    let resizeTimer;
    window.addEventListener("resize", () => {
      // Disable transitions during resize to prevent drawer animation
      document.body.classList.add("resizing");
      
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resizing");
      }, 100); // Short delay to ensure breakpoint state is applied

      // Check for breakpoint cross
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile) {
        // Reset desktop state if we shrink to mobile
        document.body.classList.remove("sidebar-collapsed");
        sidebar.classList.remove("collapsed");
        // Also ensure sidebar-open is removed on resize
        document.body.classList.remove("sidebar-open");
        // Ensure sidebar is hidden (not active) when crossing to mobile
        sidebar.classList.remove("active");
      }
    });
  }
});
