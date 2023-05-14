'use strict';
const btn = document.querySelector('#enter');


const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log(itemsArray);

function createItem(item) {
    itemsArray.push(item.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
}

function deleteItem(i){
    itemsArray.splice(i, 1);
    localStorage.setItem('items',JSON.stringify(itemsArray))
    location.reload();
}

function updateItem(text,i){
    itemsArray[i] = text;
    localStorage.setItem('items',JSON.stringify(itemsArray));
    location.reload();
}

btn.addEventListener('click', () => {
    const item = document.querySelector('#item');
    createItem(item);
});

function displayItems() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
        items += `
    <div class="item">
     <div class="input-controller">
        <textarea disabled> ${itemsArray[i]}</textarea>
        <div class="edit-controller">
            <ion-icon class="deleteBtn" name="trash"></ion-icon>
            <ion-icon class="editBtn" name="create"></ion-icon>
        </div>
      </div>
      <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners(){
    let  deleteBtn = document.querySelectorAll('.deleteBtn'); 
    deleteBtn.forEach((db ,i)=>{
        db.addEventListener('click', ()=>{
            deleteItem(i);
        })
    })
}
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    editBtn.forEach((eb,i)=>{
        eb.addEventListener('click',()=>{
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    })
}

function activateSaveListeners(){
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.input-controller textarea')
    saveBtn.forEach((sb,i)=>{
        sb.addEventListener('click', ()=>{
            updateItem(inputs[i].value, i);
        })
    })
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll('.cancelBtn');
    const updateController = document.querySelectorAll('.update-controller')
    const inputs = document.querySelectorAll('.input-controller textarea');

    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener('click',()=>{
            updateController[i].style.display= "none";
            inputs[i].disabled= true;
        })
    })

}

function displayDate() {
    let date = new Date();
    date = date.toString().split(' ');
    document.querySelector('#date').innerHTML = date[1] + ' ' + date[2] + " " + date[3];

}

window.onload = function () {
    displayDate();
    displayItems();
}