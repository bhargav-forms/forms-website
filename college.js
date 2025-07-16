document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting
        event.preventDefault();

        if (validateForm()) {
            // If validation is successful
            alert('Registration Successful! Welcome.');
            // Here you would typically send the data to a server using fetch()
            // Example:
            // const formData = new FormData(form);
            // fetch('your-server-endpoint', { method: 'POST', body: formData });
            form.reset(); // Clear the form
        } else {
            alert('Please correct the errors before submitting.');
        }
    });

    function validateForm() {
        let isValid = true;
        // Clear all previous error messages
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Helper functions for validation
        const showError = (input, message) => {
            const errorSpan = input.nextElementSibling;
            if (input.type === 'radio' || input.type === 'checkbox') {
                // For radio/checkbox, find the designated error span by ID or sibling structure
                errorSpan = document.getElementById('gender-error') || input.parentElement.parentElement.nextElementSibling;
            }
            errorSpan.textContent = message;
            input.classList.add('error');
            isValid = false;
        };
        
        // --- Field Validations ---

        // 1. Full Name
        const fullName = document.getElementById('fullName');
        if (fullName.value.trim() === '') {
            showError(fullName, 'Full Name is required.');
        }

        // 2. Date of Birth
        const dob = document.getElementById('dob');
        if (dob.value === '') {
            showError(dob, 'Date of Birth is required.');
        }

        // 3. Gender
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            // Show error near the radio group
            const genderErrorSpan = document.getElementById('gender-error');
            genderErrorSpan.textContent = 'Please select a gender.';
            isValid = false;
        }

        // 4. Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'Email is required.');
        } else if (!emailPattern.test(email.value)) {
            showError(email, 'Please enter a valid email address.');
        }

        // 5. Phone Number
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required.');
        }

        // 6. Address
        const address = document.getElementById('address');
        if (address.value.trim() === '') {
            showError(address, 'Address is required.');
        }

        // 7. Major
        const major = document.getElementById('major');
        if (major.value === '') {
            showError(major, 'Please select a major.');
        }


        // 8. Graduation Year
        const gradYear = document.getElementById('graduationYear');
        if (gradYear.value === '') {
            showError(gradYear, 'Graduation year is required.');
        }

        // 9. Terms and Conditions
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            showError(terms, 'You must agree to the terms and conditions.');
        }

        return isValid;
    }
});