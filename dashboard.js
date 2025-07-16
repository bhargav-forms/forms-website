document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevents the link from trying to navigate away
            event.preventDefault();

            // First, remove the 'active' class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });

            // Then, add the 'active' class to the one that was just clicked
            this.classList.add('active');
        });
    });
});