// Dark / Light mode toggle
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

// ✅ Load saved theme from LocalStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  }
});

// Animation on scroll
const animElements = document.querySelectorAll(".animate");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

animElements.forEach(el => observer.observe(el));
