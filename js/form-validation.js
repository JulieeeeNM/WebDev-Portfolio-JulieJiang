// Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            resetErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Form is valid - submit data or show success message
                showSuccessMessage();
            }
        });
        
        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }
});

function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError('nameError', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('messageError', 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message should be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    // Clear error if field is valid
    if (field.checkValidity()) {
        errorElement.style.visibility = 'hidden';
        field.setAttribute('aria-invalid', 'false');
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.visibility = 'visible';
        
        // Set aria-invalid on the corresponding input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.focus();
        }
    }
}

function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.visibility = 'hidden';
    });
    
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setAttribute('aria-invalid', 'false');
    });
}

function showSuccessMessage() {
    // In a real application, you would submit the form here
    // For demo purposes, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset the form
    document.getElementById('contactForm').reset();
}