// LOGIC FOR DELETING POST
async function deleteFormHandler(event) {
    event.preventDefault();

    // get id from URL string
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // DELETE route using id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // on success, redirect to dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.delete-btn').addEventListener('click', deleteFormHandler);