document.addEventListener("DOMContentLoaded", () => {
  const clamp = document.querySelector(".mobile-clamp");
  const sidebar = document.querySelector(".bench-sidebar");

  if (clamp && sidebar) {
    clamp.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !clamp.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    });
  }
});
