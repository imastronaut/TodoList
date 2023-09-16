"use strict";

var form = document.getElementById("item-form");
var inputItem = document.getElementById("item-input");
var filter = document.getElementById("filter");
var itemsList = document.getElementById("item-list");
var clearBtn = document.getElementById("clear");
var formBtn = form.querySelector("button");
var isEditMode = false; //Function handling form submission

var onAddItemSubmit = function onAddItemSubmit(e) {
  e.preventDefault();
  var items = getItemsFromLocalStorage();

  if (inputItem.value === '') {
    alert("Please Enter something to add");
    return;
  } //Check for is edit mode 


  if (isEditMode) {
    var itemToEdit = itemsList.querySelector(".edit-mode");
    removeItemFromLocal(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (ItemsExists(inputItem.value)) {
      alert("This item exists already");
      return;
    }
  }

  var newItem = inputItem.value;
  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);
  checkUI();
  inputItem.value = '';
};

function ItemsExists(item) {
  var items = getItemsFromLocalStorage();

  if (items.includes(item)) {
    return true;
  } else {
    return false;
  }
} // Function to add an item to DOM


var addItemToDOM = function addItemToDOM(item) {
  var li = document.createElement("li");
  var textNode = document.createTextNode(item);
  var button = createButton("remove-item btn-link text-red");
  var icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(textNode);
  li.append(button);
  itemsList.append(li);
}; //Function a button with custom class


function createButton(classes) {
  var button = document.createElement("button");
  button.className = classes;
  return button;
} //Function to create an icon with custon class


function createIcon(classes) {
  var icon = document.createElement("icon");
  icon.className = classes;
  return icon;
}

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemsList.querySelectorAll("li");
  items.forEach(function (item) {
    var itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
} //Adding an item to LocalStorage


function addItemToLocalStorage(item) {
  var items = getItemsFromLocalStorage();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
} //Function that get items from LocalStorage


function getItemsFromLocalStorage() {
  var items = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
  return items;
} //Function to display ListItems


function displayItems() {
  var items = getItemsFromLocalStorage();
  items.forEach(function (item) {
    return addItemToDOM(item);
  });
  checkUI();
}

function removeItem(item) {
  var text = item.firstChild.textContent;

  if (confirm('Are you sure?')) {
    item.remove();
    removeItemFromLocal(item.textContent);
    checkUI();
  }
}

function removeItemFromLocal(item) {
  var items = getItemsFromLocalStorage();
  var newItems = items.filter(function (i) {
    return i.toLowerCase() != item.toLowerCase();
  });
  localStorage.setItem("items", JSON.stringify(newItems));
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemsList.querySelectorAll("li").forEach(function (i) {
    return i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  inputItem.value = item.textContent;
}

function clearItems() {
  localStorage.removeItem("items");
  itemsList.innerHTML = '';
  displayItems();
} //Function to checkUI


function checkUI() {
  inputItem.value = "";
  var items = getItemsFromLocalStorage();

  if (items.length == 0) {
    filter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearBtn.style.display = "block";
  }

  isEditMode = false;
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

function init() {
  // Adding onsubmit event to form to add new Item to DOM
  form.addEventListener("submit", onAddItemSubmit);
  itemsList.addEventListener("click", onClickItem);
  displayItems();
  filter.addEventListener("input", filterItems);
  clearBtn.addEventListener("click", clearItems);
}

init();
//# sourceMappingURL=script.dev.js.map
