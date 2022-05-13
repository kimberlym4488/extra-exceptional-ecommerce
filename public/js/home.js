// add product function, on click inside add product modal.
const addProduct = async (event) => {
  event.preventDefault();

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

// after showing categories, show tags in the add product modal.
const showTags = async (event) => {
  event.preventDefault();
  const response = await fetch('api/tags/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const tags = await response.json();
    let tagDropdown = document.querySelector('#tag_id');
    tagDropdown.length = 0;

    let tagDefaultOption = document.createElement('option');
    tagDefaultOption.text = 'Choose a tag';

    tagDropdown.add(tagDefaultOption);
    tagDropdown.selectedIndex = 0;

    console.log(tags.tag_name);
    // add in each option for the categories dynamically.
    let tagOption;
    for (let i = 0; i < tags.length; i++) {
      tagOption = document.createElement('option');
      tagOption.text = tags[i].tag_name;
      tagOption.value = tags[i].id;
      tagDropdown.add(tagOption);
    }
  } else {
    console.log('Unable to view tags');
  }
};

// function called when I click the add product modal open.
const showCategories = async (event) => {
  event.preventDefault();
  const response = await fetch('api/categories/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const categories = await response.json();
    let dropdown = document.querySelector('#category_id');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a category';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    console.log(categories.category_name);
    // add in each option for the categories dynamically.
    let option;
    for (let i = 0; i < categories.length; i++) {
      option = document.createElement('option');
      option.text = categories[i].category_name;
      option.value = categories[i].id;
      dropdown.add(option);
    }
    showTags(event);
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};
