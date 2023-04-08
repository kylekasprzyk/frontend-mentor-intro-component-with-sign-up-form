const form = document.getElementById('sign-up-form');
const inputSectionEl = document.querySelector(".input-section");
const thankYouEl = document.querySelector(".thank-you-section");

form.addEventListener('submit', handleSubmit);

document.querySelectorAll('form').forEach(inpEl => {
    inpEl.addEventListener('click', event => {
        const fieldName = event.target.name;
        const errorSpan = document.getElementById(`${fieldName}-error`);
        errorSpan.textContent = '';
    });
});

function handleSubmit(event) {
    event.preventDefault(); // prevent form from submitting

    // get form data
    const formData = new FormData(event.target);
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const email = formData.get('email');
    const password = formData.get('password');

    // check for empty fields
    const errors = {};
    if (!firstName) {
        errors['first-name'] = 'First Name cannot be empty';
    }
    if (!lastName) {
        errors['last-name'] = 'Last Name cannot be empty';
    }
    if (!email) {
        errors['email'] = 'Looks like this is not an email';
    }
    if (!password) {
        errors['password'] = 'Password cannot be empty';
    }

    // display error messages
    Object.keys(errors).forEach(fieldName => {
        const errorSpan = document.getElementById(`${fieldName}-error`);
        errorSpan.textContent = errors[fieldName];
    });

    // return if any errors
    if (Object.keys(errors).length > 0) {
        return;
    }

    // check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors('Please enter a valid email address.');
        return;
    }

    // clear form data
    event.target.reset();

    inputSectionEl.style.display = 'none';

    // display thank you message
    thankYouEl.innerHTML = `
        <h2>Thank you ${firstName} ${lastName}!</h2>
        <p>Your account has been created with ${email}.</p>
        <p>Please check your email to activate your account.</p>
    `;

    thankYouEl.style.display = 'flex';
}
