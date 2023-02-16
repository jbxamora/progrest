const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    }); console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the portal page
      document.location.replace('/portal');
    } else {
      alert('Failed to log in');
    }
  }
};

//click on button directs to donation
document.getElementById("signup").onclick = function () {
  location.href = '/donation';
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


