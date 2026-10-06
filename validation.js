const registrationForm = document.getElementById('registration-form');
const formMessage = document.getElementById('form-message');

registrationForm.addEventListener('submit', (event) => {
	event.preventDefault();

	if (!registrationForm.checkValidity()) {
		formMessage.textContent = 'Please complete all fields correctly.';
		formMessage.classList.add('error');
		registrationForm.reportValidity();
		return;
	}

	formMessage.textContent = 'Registration submitted successfully.';
	formMessage.classList.remove('error');
	registrationForm.reset();
});
