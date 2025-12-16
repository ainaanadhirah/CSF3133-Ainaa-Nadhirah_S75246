// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4. Automatic slideshow
let slideIndex = 0;
const showSlides = () => {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(s => (s.style.display = 'none'));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = 'block';
};
showSlides();
setInterval(showSlides, 3000);

// 6. Animate progress bars when skills section enters view
const progressBars = document.querySelectorAll('.progress-fill');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const percent = el.getAttribute('data-percent');
      el.style.width = percent + '%';
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => observer.observe(bar));

// 7. Collapsible FAQ
const collapsibles = document.querySelectorAll('.collapsible');
collapsibles.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
