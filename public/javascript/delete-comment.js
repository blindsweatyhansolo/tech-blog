async function deleteCommentHandler(event) {
    event.preventDefault();

    // grab id from url string
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // perform DELETE request with id
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });

    // redirect to dashboard on success
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.delete-btn').addEventListener('click', deleteCommentHandler);