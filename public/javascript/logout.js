// LOGIC FOR LOGOUT
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' }
    });

    if (response.ok) {
        // redirect to homepage on successful logout
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);