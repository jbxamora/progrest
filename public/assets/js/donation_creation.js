async function signupFormHandler() {
    // event.preventDefautl();
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const project_name = document.querySelector('#project_name').value

    if (username && password && project_name) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                project_name,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        //check response status
        if (response.ok) {
            console.log(response)
            document.location.replace('/portal');
        } else {
            alert("Make sure all information is entered.");
        }
    }

}

document.getElementById("signup-form").onclick = function() {
    location.href='/portal';
  };