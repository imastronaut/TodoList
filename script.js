const form = document.getElementById("item-form");
const inputItem = document.getElementById("item-input");
const filter = document.getElementById("filter");
const itemsList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const formBtn = form.querySelector("button");

let isEditMode = false


//Function handling form submission
const onAddItemSubmit = (e)=>{
    e.preventDefault();
    const items = getItemsFromLocalStorage();
    if(inputItem.value === ''){
        alert("Please Enter something to add");
        return;
    }


    //Check for is edit mode 
    if(isEditMode){
        const itemToEdit = itemsList.querySelector(".edit-mode");
        removeItemFromLocal(itemToEdit.textContent)
        itemToEdit.classList.remove("edit-mode")
        itemToEdit.remove()
        isEditMode = false
    } else {
        if(ItemsExists(inputItem.value)){
            alert("This item exists already")
            return 
        }
    }

    const newItem = inputItem.value;
    addItemToDOM(newItem);
    addItemToLocalStorage(newItem);
    checkUI();
    inputItem.value = '';
}

function ItemsExists(item){
    const items = getItemsFromLocalStorage();
    if(items.includes(item)){
        return true;
    } else{
        return false;
    }
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

function filterItems(e){
    const text = e.target.value.toLowerCase();
    const items = itemsList.querySelectorAll("li")
    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase()
        if(itemName.includes(text)){
            item.style.display = "flex"
        } else{
            item.style.display = "none"
        }
    })
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



function removeItem(item){
    const text = item.firstChild.textContent;
    if(confirm('Are you sure?')){
        item.remove()
        removeItemFromLocal(item.textContent)
        checkUI();
    } 
}

function removeItemFromLocal(item){
    const items = getItemsFromLocalStorage();
    const newItems = items.filter((i)=>i.toLowerCase()!=item.toLowerCase())
    localStorage.setItem("items",JSON.stringify(newItems));
}

function onClickItem (e){
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target)
    }
}

function setItemToEdit(item){
    isEditMode = true
    itemsList
    .querySelectorAll("li")
    .forEach((i)=>i.classList.remove("edit-mode"));

    item.classList.add("edit-mode")
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item' 
    formBtn.style.backgroundColor = "#228B22"
    inputItem.value = item.textContent
    
}

function clearItems(){
    localStorage.removeItem("items")
    itemsList.innerHTML = ''
    displayItems();
}
//Function to checkUI
function checkUI(){
    inputItem.value = ""
    const items = getItemsFromLocalStorage();
    if(items.length==0){
        filter.style.display = "none";
        clearBtn.style.display = "none";
    } else{

        filter.style.display = "block";
        clearBtn.style.display = "block";
    }

    isEditMode = false
    
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor ="#333"
}





function init(){
    // Adding onsubmit event to form to add new Item to DOM
    form.addEventListener("submit",onAddItemSubmit)
    itemsList.addEventListener("click",onClickItem)
    displayItems();
    filter.addEventListener("input",filterItems)
    clearBtn.addEventListener("click",clearItems)
}

init();