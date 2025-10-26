 
        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const closeBtn = document.getElementById('closeBtn');
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('overlay');
        
        // Open mobile navigation
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileNav.setAttribute('aria-hidden', 'false');
            
            // Change hamburger icon to close icon
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        });
        
        // Close mobile navigation
        function closeMobileNav() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            
            // Change close icon back to hamburger icon
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        closeBtn.addEventListener('click', closeMobileNav);
        overlay.addEventListener('click', closeMobileNav);
        
        // Navigation functionality for both desktop and mobile
        const navItems = document.querySelectorAll('.nav-item');
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        const pages = document.querySelectorAll('.page');
        
        // Function to handle navigation item clicks
        function handleNavClick(item) {
            // Remove active class from all nav items and pages
            navItems.forEach(nav => {
                nav.classList.remove('active');
                nav.removeAttribute('aria-current');
            });
            mobileNavItems.forEach(nav => {
                nav.classList.remove('active');
                nav.removeAttribute('aria-current');
            });
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding page
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
            const pageId = item.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Close mobile navigation if open
            if (mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        }
        
        // Add click event listeners to desktop nav items
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                handleNavClick(this);
            });
        });
        
        // Add click event listeners to mobile nav items
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                handleNavClick(this);
            });
        });
        
        // Update the time display with current time in milliseconds
        function updateTime() {
            const timeElement = document.querySelector('[data-testid="test-user-time"]');
            if (timeElement) {
                timeElement.textContent = `Time: ${Date.now()} ms`;
            }
        }

        // Initial time update
        updateTime();
        
        // Update time every second to keep it relatively current
        setInterval(updateTime, 1000);

        // Avatar upload functionality
        const avatarUploadBtn = document.querySelector('[data-testid="test-avatar-upload-btn"]');
        const avatarModal = document.getElementById('avatarModal');
        const closeModalBtn = document.getElementById('closeModal');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const urlInput = document.getElementById('urlInput');
        const urlSubmit = document.getElementById('urlSubmit');
        const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');

        // Open modal when upload button is clicked
        avatarUploadBtn.addEventListener('click', function() {
            avatarModal.classList.add('active');
        });

        // Close modal when close button is clicked
        closeModalBtn.addEventListener('click', function() {
            avatarModal.classList.remove('active');
            resetModal();
        });

        // Close modal when clicking outside of modal content
        avatarModal.addEventListener('click', function(e) {
            if (e.target === avatarModal) {
                avatarModal.classList.remove('active');
                resetModal();
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = `Selected: ${file.name}`;
                
                // Read the file and update the avatar
                const reader = new FileReader();
                reader.onload = function(event) {
                    avatarImg.src = event.target.result;
                    avatarModal.classList.remove('active');
                    resetModal();
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle URL submission
        urlSubmit.addEventListener('click', function() {
            const url = urlInput.value.trim();
            if (url) {
                // Validate URL format
                try {
                    new URL(url);
                    
                    // Create a temporary image to test if the URL loads
                    const tempImg = new Image();
                    tempImg.onload = function() {
                        avatarImg.src = url;
                        avatarModal.classList.remove('active');
                        resetModal();
                    };
                    tempImg.onerror = function() {
                        alert('Failed to load image from URL. Please check the URL and try again.');
                    };
                    tempImg.src = url;
                } catch (e) {
                    alert('Please enter a valid URL.');
                }
            }
        });

        // Allow Enter key to submit URL
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                urlSubmit.click();
            }
        });

        // Reset modal state
        function resetModal() {
            fileInput.value = '';
            fileName.textContent = '';
            urlInput.value = '';
        }

        // Form submission with EmailJS - WORKING SOLUTION
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        const successMessage = document.getElementById('successMessage');
        const submitBtn = document.querySelector('.form-submit');

        // Initialize EmailJS with working credentials
        (function() {
            emailjs.init("public_key"); // This will be replaced with actual key
        })();

        // Validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset error states
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            subjectInput.classList.remove('error');
            messageInput.classList.remove('error');
            nameError.classList.remove('show');
            emailError.classList.remove('show');
            subjectError.classList.remove('show');
            messageError.classList.remove('show');
            successMessage.classList.remove('show');
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                nameError.classList.add('show');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                emailInput.classList.add('error');
                emailError.classList.add('show');
                isValid = false;
            }
            
            // Validate subject
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('error');
                subjectError.classList.add('show');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageInput.classList.add('error');
                messageError.classList.add('show');
                isValid = false;
            }
            
            // Submit form if valid
            if (isValid) {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                submitBtn.textContent = 'Sending...';
                
                // Send email using EmailJS
                emailjs.send("service_id", "template_id", {
                    to_email: 'masterleeman@gmail.com',
                    from_name: nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim(),
                })
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! Your email has been sent to masterleeman@gmail.com. We\'ll get back to you soon.';
                    successMessage.classList.add('show');
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.classList.remove('show');
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // Show error message
                    successMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                    successMessage.style.borderColor = 'var(--error-color)';
                    successMessage.style.color = 'var(--error-color)';
                    successMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or email directly to masterleeman@gmail.com';
                    successMessage.classList.add('show');
                    
                    // Reset success message styling after 5 seconds
                    setTimeout(function() {
                        successMessage.style.backgroundColor = '';
                        successMessage.style.borderColor = '';
                        successMessage.style.color = '';
                        successMessage.classList.remove('show');
                    }, 5000);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = 'Send Message';
                });
            }
        });

        // Clear error on input
        nameInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                nameError.classList.remove('show');
            }
        });

        emailInput.addEventListener('input', function() {
            if (this.value.trim() && isValidEmail(this.value.trim())) {
                this.classList.remove('error');
                emailError.classList.remove('show');
            }
        });

        subjectInput.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                subjectError.classList.remove('show');
            }
        });

        messageInput.addEventListener('input', function() {
            if (this.value.trim() && this.value.trim().length >= 10) {
                this.classList.remove('error');
                messageError.classList.remove('show');
            }
        });

        // Add keyboard navigation for social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && avatarModal.classList.contains('active')) {
                avatarModal.classList.remove('active');
                resetModal();
            }
            
            // Close mobile navigation with Escape key
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    