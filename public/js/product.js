// add product function, on click inside add product modal.
const addProduct = async (event) => {
  event.preventDefault();
  const product_name = document
    .querySelector('#new-product-name')
    .value.replace(/\s+/g, '-');

  const body = {
    product_name: product_name,
    price: $('#new-price').val(),
    stock: parseInt($('#new-stock').val()),
    warehouse_id: parseInt($('#new-warehouse-id').val()),
    tagIds: $('#new-tag-id').val(),
  };

  console.log(body.tagIds);
  console.log(body);

  if (body.product_name === '') {
    alert('You must enter at least one character for a product name');
    return;
  }

  const response = await fetch('api/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const myProduct = await response.json();
    alert(`Created new product' + ${myProduct.product_name}`);
    document.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

// edit product function, on click inside edit product modal.
const editProduct = async (event, id) => {
  event.preventDefault();
  const product_name = document
    .querySelector('#product-name')
    .value.replace(/\s+/g, '-');

  const body = {
    product_name: product_name,
    price: $('#price').val(),
    stock: parseInt($('#stock').val()),
    warehouse_id: parseInt($('#warehouse-id').val()),
    tagIds: $('#tag-id').val(),
  };
  // validate entry of required fields. Could do this inline html, keeping it on client side js for back-end mvp project..
  if (body.product_name === '') {
    alert('You must enter at least one character for a product name');
    return;
  }

  if (body.price === '') {
    alert('A product must have a price.');
    return;
  }
  if (body.warehouse_id === '') {
    alert('You must assign this product to a warehouse.');
    return;
  }

  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const myProduct = await response.json();
    alert(`Edited product!`);
    window.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

// client side js to call our routes from the frontend.
const deleteProduct = async (event, id) => {
  event.preventDefault();
  if (
    confirm('This step can not be undone, are you sure you want to delete?')
  ) {
    try {
      const response = await fetch(`/api/products/${id}}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Product deleted!`);
        window.location.href = '/';
      } else {
        return console.log(response);
      }
    } catch (err) {
      console.log('Unable to delete product.');
    }
  }
  return;
};
