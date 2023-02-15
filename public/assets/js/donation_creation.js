async function signupFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const project_name = document.querySelector('#project_name').value;
    const email = document.querySelector('#email-signup').value.trim();


    if (name && password && project_name && email) {
        const response = await fetch('/donation', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                project_name
                
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

document.getElementById("signup-form").addEventListener("submit",signupFormHandler);