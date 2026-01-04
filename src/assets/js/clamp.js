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
    window.addEventListener("resize", () => {
      // Check for breakpoint cross
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile) {
        // Reset desktop state if we shrink to mobile
        document.body.classList.remove("sidebar-collapsed");
        sidebar.classList.remove("collapsed");
        // Also ensure sidebar-open is removed on resize
        document.body.classList.remove("sidebar-open");
      }
    });
  }
});
