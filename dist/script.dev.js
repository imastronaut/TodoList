"use strict";

var form = document.getElementById("item-form");
var inputItem = document.getElementById("item-input");
var filter = document.getElementById("filter");
var itemsList = document.getElementById("item-list");
var clearBtn = document.getElementById("clear"); //Function handling form submission

var onAddItemSubmit = function onAddItemSubmit(e) {
  e.preventDefault();

  if (inputItem.value === '') {
    alert("Please Enter something to add");
    return;
  }

  var newItem = inputItem.value;
  addItemToDOM(newItem);
  addItemToLocalStorage(newItem);
  checkUI();
  inputItem.value = '';
}; // Function to add an item to DOM


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
} //Function to checkUI


function checkUI() {
  var items = getItemsFromLocalStorage();

  if (items.length == 0) {
    filter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

function init() {
  // Adding onsubmit event to form to add new Item to DOM
  form.addEventListener("submit", onAddItemSubmit);
  displayItems();
}

init();
//# sourceMappingURL=script.dev.js.map
