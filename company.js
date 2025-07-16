document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();
        
        // Reset previous messages
        formMessage.style.display = 'none';
        formMessage.className = '';

        if (validateForm()) {
            // If validation is successful
            displayMessage('Registration successful!', 'success');

            // Here you would typically send the data to a server
            // For demonstration, we'll log the data to the console
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Data Submitted:', data);

            // Reset the form after successful submission
            form.reset();
        }
    });

    function validateForm() {
        // Get values from form fields
        const fullName = document.getElementById('fullName').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const designation = document.getElementById('designation').value.trim();
        const startYear = document.getElementById('startYear').value;
        const endYear = document.getElementById('endYear').value.trim();
        const ctc = document.getElementById('ctc').value;
        const joiningYear = document.getElementById('joiningYear').value;
        const email = document.getElementById('email').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        
        // Validation checks
        if (!fullName) return showError('Full Name is required.');
        if (!companyName) return showError('Company Name is required.');
        if (!designation) return showError('Designation is required.');
        
        // Year validation
        const currentYear = new Date().getFullYear();
        if (!startYear || startYear < 1950 || startYear > currentYear) return showError('Please enter a valid Start Year.');
        if (!endYear) return showError('End Year is required (use "Present" if currently working).');
        if (endYear.toLowerCase() !== 'present' && (isNaN(endYear) || endYear < startYear)) {
            return showError('End Year must be "Present" or a year greater than or equal to the Start Year.');
        }

        if (!ctc || ctc <= 0) return showError('Please enter a valid Current CTC.');
        if (!joiningYear || joiningYear < 1950 || joiningYear > currentYear) return showError('Please enter a valid Year of Joining.');
        
        // Email validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) return showError('Please enter a valid Email ID.');
        
        // Contact number validation using regex (10 digits)
        const contactPattern = /^\d{10}$/;
        if (!contactNumber || !contactPattern.test(contactNumber)) return showError('Please enter a valid 10-digit Contact Number.');

        return true; // Form is valid
    }

    function showError(message) {
        displayMessage(message, 'error');
        return false; // Indicate validation failure
    }

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type; // 'success' or 'error'
        formMessage.style.display = 'block';
    }
});