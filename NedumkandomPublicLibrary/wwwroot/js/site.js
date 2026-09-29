// Client-side interactions for Nedumkandom Public Library Web Portal
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;
            const parts = href.split('#');
            const targetId = parts[1];
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, '', `#${targetId}`);
                }
            }
        });
    });

    // 2. Radio Card Active State
    const categoryRadios = document.querySelectorAll('input[name="Form.Category"]');

    // Attach change handlers to all category radio buttons
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Update active styling across category cards
            document.querySelectorAll('.category-card').forEach(card => card.classList.remove('active'));
            const parentCard = radio.closest('.category-card');
            if (parentCard) parentCard.classList.add('active');
        });
    });

    // Gender radio cards active styling
    const genderRadios = document.querySelectorAll('input[name="Form.Gender"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.gender-radio-grid .radio-card').forEach(card => card.classList.remove('active'));
            const parentCard = radio.closest('.radio-card');
            if (parentCard) parentCard.classList.add('active');
        });
    });

    // 3. Form Submit Loading State & Duplicate Submission Prevention
    const membershipForm = document.getElementById('membershipForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const btnSubmitText = document.getElementById('btnSubmitText');
    const btnSubmitLoading = document.getElementById('btnSubmitLoading');

    if (membershipForm && btnSubmit) {
        membershipForm.addEventListener('submit', function (e) {
            // Client-side HTML5 validation check
            if (!membershipForm.checkValidity()) {
                return; // Let browser display field validation
            }

            // Show loading animation
            if (btnSubmitText) btnSubmitText.classList.add('hidden');
            if (btnSubmitLoading) btnSubmitLoading.classList.remove('hidden');
            btnSubmit.setAttribute('disabled', 'disabled');
        });
    }

    // 4. Viewport Retention & Auto-Scroll after Form Submission / Validation Error
    const successCard = document.getElementById('applicationSuccessCard');
    const generalError = document.querySelector('.general-error-box');
    const fieldError = document.querySelector('.input-error');

    if (successCard) {
        // Center the viewport on the success confirmation card immediately
        successCard.scrollIntoView({ behavior: 'auto', block: 'center' });
    } else if (generalError) {
        generalError.scrollIntoView({ behavior: 'auto', block: 'center' });
    } else if (fieldError) {
        const fieldGroup = fieldError.closest('.form-field-group') || fieldError;
        fieldGroup.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
});
