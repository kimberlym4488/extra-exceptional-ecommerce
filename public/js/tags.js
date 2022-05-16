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
    alert(`Created new tag ' + ${tag.tag_name}`);
    window.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

const editTag = async (event, id) => {
  event.preventDefault();
  let tag_name = document.querySelector('#tag-name').value;
  // OPTIONAL: remove spaces so class name matches for edit dropdown
  tag_name = tag_name.replace(/\s+/g, '-');
  console.log(tag_name);
  try {
    const response = await fetch(`/api/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tag_name: tag_name,
      }),
    });
    alert(response);
    if (response.ok) {
      // take user back to tag page and refresh with updated data.
      window.location.href = '/api/tags/all';
    } else {
      console.log('Unable to edit this tag');
    }
  } catch (err) {
    console.log('Unable to delete tag.');
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
