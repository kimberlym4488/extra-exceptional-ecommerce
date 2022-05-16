// add warehouses function
const addWarehouse = async (event) => {
  event.preventDefault();
  // remove spaces so class name matches warehouses name. An edge case would be if the user entered warehouses-name as the warehouses name.
  const new_warehouse_name = $('#new-warehouse-name')
    .val()
    .split(' ')
    .join('-');
  if (new_warehouse_name === '') {
    alert('You must enter at least one character for a warehouses name');
    return;
  }
  const response = await fetch('/api/warehouses/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      warehouse_name: new_warehouse_name,
    }),
  });

  if (response.ok) {
    // would prefer to use toasts or sweet alerts, but since this is back-end focused, I used basic dom alert.
    alert('Created new warehouse!');
    window.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

const editWarehouse = async (event, id) => {
  event.preventDefault();

  let warehouse-name-id = `warehouse-name-${id}`
  // OPTIONAL: remove spaces so class name matches for edit dropdown
  warehouse_name = warehouse_name.replace(/\s+/g, '-');

  if (warehouse_name === '') {
    alert('You must enter at least one character for a warehouse name');
    return;
  }
  try {
    const response = await fetch(`/api/warehouses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        warehouse_name: warehouse_name,
      }),
    });

    if (response.ok) {
      // take user back to warehouses page and refresh with updated data.
      window.location.href = '/api/warehouses/all';
    } else {
      console.log('Unable to edit this warehouse');
    }
  } catch (err) {
    console.log('Unable to edit warehouse.');
  }
};
// client side js to call our routes from the frontend. Only allow a delete if a warehouse has no products.
const deleteWarehouse = async (id) => {
  if (
    confirm('This step can not be undone, are you sure you want to delete?')
  ) {
    try {
      const response = await fetch(`/api/warehouses/${id}}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/api/warehouses/all';
      } else {
        return console.log('Error has occurred');
      }
    } catch (err) {
      console.log('Unable to delete warehouses.');
    }
  }
};
