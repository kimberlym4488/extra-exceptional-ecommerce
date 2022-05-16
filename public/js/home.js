// after showing warehouses, show tags in the add product modal.
const showTags = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/tags/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const tags = await response.json();
    let tagDropdown = document.querySelector('#new-tag-id');
    tagDropdown.length = 0;

    let tagDefaultOption = document.createElement('option');
    tagDefaultOption.text = 'Tags (ctrl/cmd + click to select multiple)';

    tagDropdown.add(tagDefaultOption);
    tagDropdown.selectedIndex = 0;

    // add in each option for the tags dynamically.
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
const showWarehouses = async (event) => {
  event.preventDefault();
  const response = await fetch('/api/warehouses/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const warehouses = await response.json();
    let dropdown = document.querySelector('#new-warehouse-id');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a warehouse';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    // add in each option for the warehouses dynamically.
    let option;
    for (let i = 0; i < warehouses.length; i++) {
      option = document.createElement('option');
      option.text = warehouses[i].warehouse_name;
      option.value = warehouses[i].id;
      dropdown.add(option);
    }
    showTags(event);
  } else {
    const errorObj = await response.json();
    console.log(errorObj.message);
  }
};
