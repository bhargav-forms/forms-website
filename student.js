document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');
    const photoInput = document.getElementById('photo');
    const imagePreview = document.getElementById('imagePreview');
    const imagePreviewText = imagePreview.querySelector('.image-preview-text');

    // Handle Photo Preview
    photoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            imagePreviewText.style.display = 'none';
            imagePreview.style.backgroundImage = `url('')`; // Clear previous image

            reader.addEventListener('load', function() {
                imagePreview.style.backgroundImage = `url(${this.result})`;
            });

            reader.readAsDataURL(file);
        } else {
            imagePreviewText.style.display = 'block';
            imagePreview.style.backgroundImage = 'none';
        }
    });

    // Handle Form Submission
    registrationForm.addEventListener('submit', function(event) {
        // Prevent the default form submission to the server
        event.preventDefault();

        // Clear previous messages
        messageDiv.innerHTML = '';
        messageDiv.className = 'message';

        // Basic validation check
        const inputs = registrationForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        
        // Check radio buttons for gender
        const genderSelected = registrationForm.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            isValid = false;
        }

        if (isValid) {
            // If the form is valid, show a success message
            messageDiv.textContent = 'Registration Successful!';
            messageDiv.classList.add('success');
            
            // In a real-world application, you would send the form data to a server here.
            // For example, using the Fetch API:
            // const formData = new FormData(registrationForm);
            // fetch('your-server-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => console.log('Success:', data))
            // .catch(error => console.error('Error:', error));

            console.log('Form data submitted (for demonstration):');
            const formData = new FormData(registrationForm);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Reset the form after a short delay
            setTimeout(() => {
                registrationForm.reset();
                imagePreviewText.style.display = 'block';
                imagePreview.style.backgroundImage = 'none';
                messageDiv.style.display = 'none';
            }, 3000);

        } else {
            // If the form is invalid, show an error message
            messageDiv.textContent = 'Please fill out all required fields.';
            messageDiv.classList.add('error');
        }
    });
});