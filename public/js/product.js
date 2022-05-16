// add product function, on click inside add product modal.
const addProduct = async (event) => {
  event.preventDefault();

  const body = {
    product_name: $('#new-product-name').val(),
    price: $('#new-price').val(),
    stock: parseInt($('#new-stock').val()),
    category_id: parseInt($('#new-category-id').val()),
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
const editProduct = async (id) => {

  const body = {
    product_name: $('#product-name').val(),
    price: $('#price').val(),
    stock: parseInt($('#stock').val()),
    category_id: parseInt($('#category_id').val()),
    tagIds: $('#tag_id').val(),
  };

  console.log(body.tagIds);
  console.log(body);

  if (body.product_name === '') {
    alert('You must enter at least one character for a product name');
    return;
  }

  const response = await fetch(`api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const myProduct = await response.json();
    alert(`Edited product' + ${myProduct.product_name}`);
    document.location.href = '/';
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};

// client side js to call our routes from the frontend.
const deleteProduct = async (id) => {
  alert('you reached delete product');
  try {
    alert(id);
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
};

