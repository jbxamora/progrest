async function signupFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const project_name = document.querySelector('#project_name').value;
    const email = document.querySelector('#email-signup').value.trim();

//if name pass project and email POST which will go to the backend
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
            document.location.replace('/login');
            alert("Your account has been created/ please use your email and login in the login page")
        } else {
            alert("Make sure all information is entered.");
        }
    }

}
//when click submit post 
document.getElementById("signup-form").addEventListener("submit",signupFormHandler);