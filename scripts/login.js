const URL = 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php';
const loginForm = document.getElementById('login');

if (localStorage.password) { delete localStorage.password }
if (localStorage.username) { delete localStorage.username }


function displayError() {
    let errorDiv = document.getElementById('error');
    let messageDiv = document.createElement('div');
    let errorP = document.createElement('p');
    let inputs = document.querySelectorAll('input');
    
    inputs.forEach((el) => {
        if (el.value !== 'Submit') {
            el.addEventListener('click', () => {
                messageDiv.setAttribute('class', 'fade-out');
                setTimeout(() => { messageDiv.remove() }, 150);
            });
        }
    });

    if (document.getElementById('msg')) { document.getElementById('msg').remove(); }

    messageDiv.setAttribute('class', 'fade-in');
    messageDiv.setAttribute('id', 'msg');
    errorDiv.appendChild(messageDiv);
    messageDiv.appendChild(errorP);
    errorP.setAttribute('class', 'error-msg');
    errorP.innerText = 'Incorrect username or password.'
}


loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents page from reloading
    // let usrnme = document.getElementById('username').value;
    // let pswrd = document.getElementById('password').value;

    let usrnme = 'Harpo'; // remove after testing
    let pswrd = 'swordfish'; // remove after testing
    let data = `userName=${usrnme}&password=${pswrd}`;

    const request = new XMLHttpRequest();
    request.open("POST", URL);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let responseJSON = JSON.parse(request.responseText);

            console.log('status: ' + request.status); // remove later
            console.log('response: ', responseJSON); // remove later

            function redirectPage(credentials) {
                console.log('TODO: Run check on grid page to see if local storage is correct');
                // save response into local storage
                localStorage.setItem('isvalid', credentials.result);
                localStorage.setItem('username', credentials.userName);
                localStorage.setItem('timestamp', credentials.timestamp);
                // redirect to game page
                window.location.href="../html/grid.html";
            }
            responseJSON.result === 'valid' ? redirectPage(responseJSON) : displayError();
        }
    }
    request.send(data);
});



// NAME	    PASSWORD
// Harpo	swordfish
// Groucho	horsefeathers
// Bilbo	baggins
// Sam	    gamgee
// Luke	    usetheforce