document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Fade-up Animation on Scroll
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  fadeUpElements.forEach(el => fadeObserver.observe(el));

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  let animationStarted = false;
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const stepTime = 20; // 20ms update interval
          const steps = duration / stepTime;
          const stepAmount = target / steps;
          let current = 0;
          
          const isFloat = target % 1 !== 0;
          
          const timer = setInterval(() => {
            current += stepAmount;
            if (current >= target) {
              clearInterval(timer);
              current = target;
              
              // Add a plus sign to large numbers
              if (target >= 1000) {
                counter.innerText = Math.round(current) + '+';
              } else {
                counter.innerText = isFloat ? current.toFixed(1) : Math.round(current);
              }
            } else {
              counter.innerText = isFloat ? current.toFixed(1) : Math.round(current);
            }
          }, stepTime);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // Handle forms
  const bookingForm = document.getElementById('hero-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Your ride request is received! We are finding the nearest driver.');
      bookingForm.reset();
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }
});
