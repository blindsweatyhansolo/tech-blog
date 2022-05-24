async function editCommentHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // console.log(comment_text, id);
    // PUT request with gathered values
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('.edit-btn').addEventListener('click', editCommentHandler);