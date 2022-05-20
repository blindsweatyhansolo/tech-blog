// LOGIC FOR POSTING NEW COMMENT
async function commentFormHandler(event) {
    event.preventDefault();

    // grab text value from text area, save as comment_text
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // grab id from single-post URL string
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if there is a captured value from the textarea, then run POST request
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        // reload page on success
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);