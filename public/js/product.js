// client side js to call our routes from the frontend.
deleteProduct = async (id) => {
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
