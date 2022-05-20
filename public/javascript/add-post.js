// LOGIC FOR CREATING NEW POST
async function newFormHandler(event) {
    event.preventDefault();

    // grab values from form fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-body"]').value;

    // POST route using fetched values
    const response = await fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    // on success, reload page with new post
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);