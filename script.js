const form = document.getElementById("item-form");
const inputItem = document.getElementById("item-input");
const filter = document.getElementById("filter");
const itemsList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");


//Function handling form submission
const onAddItemSubmit = (e)=>{
    e.preventDefault();
    if(inputItem.value === ''){
        alert("Please Enter something to add");
        return;
    }

    const newItem = inputItem.value;
    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);
    checkUI();
    inputItem.value = '';
}

// Function to add an item to DOM
const addItemToDOM = (item)=>{

    const li = document.createElement("li");
    const textNode = document.createTextNode(item);
    const button = createButton("remove-item btn-link text-red");
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    li.appendChild(textNode);
    li.append(button);
    itemsList.append(li); 
}


//Function a button with custom class
function createButton(classes){
    const button = document.createElement("button");
    button.className = classes;
    return button;
}


//Function to create an icon with custon class
function createIcon(classes){
    const icon = document.createElement("icon");
    icon.className = classes;
    return icon;
}


//Adding an item to LocalStorage
function addItemToLocalStorage(item){
    const items = getItemsFromLocalStorage();
    items.push(item);
    localStorage.setItem("items",JSON.stringify(items));

}


//Function that get items from LocalStorage
function getItemsFromLocalStorage(){
    const items = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];
    return items;
}


//Function to display ListItems
function displayItems(){
    const items = getItemsFromLocalStorage();
    items.forEach((item)=>addItemToDOM(item));
    checkUI();
}

//Function to checkUI
function checkUI(){
    const items = getItemsFromLocalStorage();
    if(items.length==0){
        filter.style.display = "none";
        clearBtn.style.display = "none";
    } else{

        filter.style.display = "block";
        clearBtn.style.display = "block";
    }
}





function init(){
    // Adding onsubmit event to form to add new Item to DOM
    form.addEventListener("submit",onAddItemSubmit)
    displayItems();
}

init();