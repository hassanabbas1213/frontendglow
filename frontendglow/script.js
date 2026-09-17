// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if(navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            
            // Close all others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-body').style.display = 'none';
                }
            });
            
            // Toggle current
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                body.style.display = 'block';
            } else {
                body.style.display = 'none';
            }
        });
    });

    // Contact Form Logic
    const serviceSelect = document.getElementById('service');
    const packageGroup = document.getElementById('packageGroup');
    const contactForm = document.getElementById('contactForm');

    if(serviceSelect) {
        serviceSelect.addEventListener('change', (e) => {
            if(e.target.value === 'AI-Powered Website Development') {
                packageGroup.style.display = 'block';
                document.getElementById('package').required = true;
            } else {
                packageGroup.style.display = 'none';
                document.getElementById('package').required = false;
            }
        });
        
        // Form auto-fill from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const planParam = urlParams.get('plan');

        if (serviceParam) {
            if (serviceParam === 'web') {
                serviceSelect.value = 'AI-Powered Website Development';
                packageGroup.style.display = 'block';
                document.getElementById('package').required = true;
                
                if (planParam) {
                    const packageSelect = document.getElementById('package');
                    if (planParam === 'basic') packageSelect.value = 'Basic';
                    if (planParam === 'standard') packageSelect.value = 'Standard';
                    if (planParam === 'premium') packageSelect.value = 'Premium';
                }
            } else if (serviceParam === 'automation') {
                serviceSelect.value = 'AI Automation';
            } else if (serviceParam === 'calling') {
                serviceSelect.value = 'AI Calling Agent';
            }
            
            // Scroll to contact form smoothly if we have a service param
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value || 'Not provided';
            const service = document.getElementById('service').value;
            const pkg = document.getElementById('package').value || 'N/A';
            const budget = document.getElementById('budget').value || 'Not provided';
            const message = document.getElementById('message').value;

            let whatsappMessage = `*New Lead from Website*\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            whatsappMessage += `*Email:* ${email}\n`;
            whatsappMessage += `*Company:* ${company}\n`;
            whatsappMessage += `*Service:* ${service}\n`;
            if (service === 'AI-Powered Website Development') {
                whatsappMessage += `*Plan:* ${pkg}\n`;
            }
            whatsappMessage += `*Budget:* ${budget}\n\n`;
            whatsappMessage += `*Requirements:* \n${message}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/923016631312?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});
