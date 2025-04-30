// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const productCards = document.querySelectorAll('.product-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');
    const reviewSlides = document.querySelectorAll('.review-slide');
    const contactForm = document.getElementById('inquiry-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // ========== Header Scroll Effect ==========
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== Mobile Menu Toggle ==========
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // ========== Active Navigation Link ==========
    // Function to set active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Initial call

    // ========== Product Category Filter ==========
    // Function to filter products by category
    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add event listeners to category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter products
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    // ========== Testimonial Slider ==========
    let currentSlide = 0;
    const slideCount = reviewSlides.length;
    
    // Initialize slider
    function initSlider() {
        if (slideCount === 0) return;
        
        // Hide all slides except the first one
        reviewSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
    }
    
    // Show a specific slide
    function showSlide(index) {
        if (slideCount === 0) return;
        
        // Hide all slides
        reviewSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the specified slide
        reviewSlides[index].style.display = 'block';
        
        // Animate the slide
        reviewSlides[index].style.opacity = '0';
        setTimeout(() => {
            reviewSlides[index].style.opacity = '1';
        }, 50);
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }
    
    // Add event listeners to slider controls
    if (prevReviewBtn && nextReviewBtn) {
        prevReviewBtn.addEventListener('click', prevSlide);
        nextReviewBtn.addEventListener('click', nextSlide);
    }
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize the slider
    initSlider();

    // ========== Contact Form Submission ==========
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate success response after 1.5 seconds
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ========== Newsletter Subscription ==========
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate success response after 1.5 seconds
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ========== Image Lazy Loading ==========
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, imgOptions);
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Animation on Scroll ==========
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.product-card, .team-member, .section-header');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial call

    // Initialize with all products shown
    filterProducts('all');
});

// Initialize founder photo placeholder
document.addEventListener('DOMContentLoaded', function() {
    // Create a custom placeholder for the founder photo
    const founderPhoto = document.querySelector('.founder-photo');
    if (founderPhoto) {
        // We're using a CSS background for the founder photo
        // This is handled in the CSS with a data URI SVG
    }
});
