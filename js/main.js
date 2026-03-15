// Dr. Sneha's Care & Cure Dental Clinic - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Navigation Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Appointment Form ---
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (appointmentForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            var name = document.getElementById('patientName').value.trim();
            var phone = document.getElementById('patientPhone').value.trim();
            var date = document.getElementById('appointmentDate').value;
            var time = document.getElementById('appointmentTime').value;

            if (!name || !phone || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Phone validation (10 digits)
            var phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // Build WhatsApp message with form data
            var service = document.getElementById('serviceType').value;
            var message = document.getElementById('message').value.trim();

            var waMessage = 'Hello Dr. Sneha,\n\n';
            waMessage += 'I would like to book an appointment.\n\n';
            waMessage += 'Name: ' + name + '\n';
            waMessage += 'Phone: ' + phone + '\n';
            waMessage += 'Preferred Date: ' + date + '\n';
            waMessage += 'Preferred Time: ' + time + '\n';

            if (service) {
                waMessage += 'Service: ' + service + '\n';
            }
            if (message) {
                waMessage += 'Message: ' + message + '\n';
            }

            waMessage += '\nThank you!';

            // Open WhatsApp with the message
            var waUrl = 'https://wa.me/917249044414?text=' + encodeURIComponent(waMessage);
            window.open(waUrl, '_blank');

            // Show success message
            appointmentForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        });
    }

    // --- Gallery Carousel ---
    var track = document.getElementById('galleryTrack');
    var dotsContainer = document.getElementById('galleryDots');
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');

    if (track && dotsContainer) {
        var slides = track.querySelectorAll('.gallery-slide');
        var total = slides.length;
        var current = 0;
        var autoplayInterval = null;

        // Create dots
        for (var i = 0; i < total; i++) {
            var dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        }

        var dots = dotsContainer.querySelectorAll('.gallery-dot');

        function goToSlide(index) {
            current = ((index % total) + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function (d, j) {
                d.classList.toggle('active', j === current);
            });
        }

        prevBtn.addEventListener('click', function () {
            goToSlide(current - 1);
            resetAutoplay();
        });

        nextBtn.addEventListener('click', function () {
            goToSlide(current + 1);
            resetAutoplay();
        });

        dotsContainer.addEventListener('click', function (e) {
            var dot = e.target.closest('.gallery-dot');
            if (dot) {
                goToSlide(parseInt(dot.dataset.index, 10));
                resetAutoplay();
            }
        });

        // Touch / swipe support
        var touchStartX = 0;
        var touchEndX = 0;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(current + 1);
                } else {
                    goToSlide(current - 1);
                }
                resetAutoplay();
            }
        }, { passive: true });

        // Auto-scroll every 4 seconds
        function startAutoplay() {
            autoplayInterval = setInterval(function () {
                goToSlide(current + 1);
            }, 4000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Pause on hover
        var carousel = document.getElementById('galleryCarousel');
        carousel.addEventListener('mouseenter', function () {
            clearInterval(autoplayInterval);
        });
        carousel.addEventListener('mouseleave', function () {
            startAutoplay();
        });

        startAutoplay();
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations (with stagger) ---
    var animateElements = document.querySelectorAll(
        '.service-card, .why-us-card, .testimonial-card, .value-card, .patient-type, .clinic-feature, .contact-card, .service-detail-block'
    );

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        // Group elements by parent to compute per-group stagger index
        var parentGroups = new Map();
        animateElements.forEach(function (el) {
            var parent = el.parentElement;
            if (!parentGroups.has(parent)) parentGroups.set(parent, []);
            parentGroups.get(parent).push(el);
        });

        parentGroups.forEach(function (group) {
            group.forEach(function (el, idx) {
                el._staggerDelay = idx * 90; // 90ms per sibling
                el.classList.add('animate-ready');
            });
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var delay = el._staggerDelay || 0;
                        setTimeout(function () {
                            el.classList.add('animate-in');
                        }, delay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
        );

        animateElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // --- Counter Animation for Experience Badge ---
    var expNumber = document.querySelector('.exp-number');
    if (expNumber && 'IntersectionObserver' in window) {
        var targetText = expNumber.textContent.trim();
        var target = parseInt(targetText, 10);
        var suffix = targetText.replace(/[0-9]/g, '');

        var counterObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                var duration = 1400;
                var startTime = null;

                function animateCount(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    expNumber.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(animateCount);
                    } else {
                        expNumber.textContent = targetText;
                    }
                }

                requestAnimationFrame(animateCount);
                counterObserver.unobserve(expNumber);
            }
        }, { threshold: 0.6 });

        counterObserver.observe(expNumber);
    }
});
