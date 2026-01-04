document.addEventListener("DOMContentLoaded", () => {
  const clamp = document.querySelector(".mobile-clamp");
  const sidebar = document.querySelector(".bench-sidebar");

  if (clamp && sidebar) {
    clamp.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate close
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      
      if (isMobile) {
        sidebar.classList.toggle("active");
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
        }
      }
    });

    // Resize Handler for Transitions & State
    let resizeTimer;
    window.addEventListener("resize", () => {
      document.body.classList.add("resizing");
      
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resizing");
      }, 400);

      // Check for breakpoint cross
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile) {
        // Reset desktop state if we shrink to mobile
        document.body.classList.remove("sidebar-collapsed");
        sidebar.classList.remove("collapsed");
      }
    });
  }
});
