const addItemsForm = document.querySelector('.add-items');
const inputEl = addItemsForm.querySelector('input[name="item"]');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("item")) || [];
const clearBtn = addItemsForm.querySelector("#clearBtn");
const checkBtn = addItemsForm.querySelector("#checkBtn");
const uncheckBtn = addItemsForm.querySelector("#uncheckBtn");



publishItems(itemsList,items);

function publishItems(ulLocation,itemsArray = []){
    const listString  = itemsArray.map((item,index) => {
        return `
            <li>
                <input id="${item.text}-${index}" data-index="${index}" type="checkbox" ${item.done ? "checked" : ""}>
                <label for="${item.text}-${index}">
                    ${item.text}
                </label>
            </li>
        `
    }).join("");
    ulLocation.innerHTML = listString;   
}

function formSubmit(e){
    e.preventDefault();
    const text = inputEl.value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    this.reset();
    localStorage.setItem("item",JSON.stringify(items));
    console.log("Submit:",JSON.parse(localStorage.getItem("item")),items)
    publishItems(itemsList,JSON.parse(localStorage.getItem("item")));
}

function checkBoxFunc(e){
    if(!e.target.matches("input"))return;
    const localItem = JSON.parse(localStorage.getItem("item"));
    localItem[e.target.dataset.index].done = !localItem[e.target.getAttribute("data-index")].done;
    localStorage.setItem("item",JSON.stringify(localItem));
    items.splice(0,items.length,...JSON.parse(localStorage.getItem("item")));
    console.table("Clicked:",JSON.parse(localStorage.getItem("item")),":",localItem)
    publishItems(itemsList,localItem);
}

itemsList.addEventListener('click',checkBoxFunc);
addItemsForm.addEventListener('submit',formSubmit);
clearBtn.addEventListener('click',() =>{
    localStorage.clear();
    items.splice(0,items.length);
    publishItems(itemsList,[]);
});

checkBtn.addEventListener('click',() => {
    const localItem = JSON.parse(localStorage.getItem("item"));
    localItem.map((cur,index) => {
        console.log(cur[index].done);
    });
});

uncheckBtn.addEventListener('click',() => {
    
});