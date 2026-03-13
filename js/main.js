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

    // --- Intersection Observer for Scroll Animations ---
    var animateElements = document.querySelectorAll(
        '.service-card, .why-us-card, .testimonial-card, .value-card, .patient-type, .clinic-feature, .contact-card, .service-detail-block'
    );

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        animateElements.forEach(function (el) {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
});
