// add tag function, on click inside add tag modal.
const addTag = async (event) => {
  event.preventDefault();
  // remove spaces so class name matches tag name. An edge case would be if the user entered tag-name as the tag name.
  const new_tag_name = $('#new-tag-name').val().split(' ').join('-');
  if (new_tag_name === '') {
    alert('You must enter at least one character for a tag name');
    return;
  }
  const response = await fetch('/api/tags/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tag_name: new_tag_name,
    }),
  });

  if (response.ok) {
    const tag = await response.json();
    // would prefer to use toasts or sweet alerts, but since this is back-end focused, I used basic dom alert.
    alert('Created new tag!');
    window.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

// client side js to call our routes from the frontend.
const deleteTag = async (id) => {
  try {
    const response = await fetch(`/api/tags/${id}}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = '/api/tags/all';
    } else {
      return console.log('Error has occurred');
    }
  } catch (err) {
    console.log('Unable to delete tag.');
  }
};
