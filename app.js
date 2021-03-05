// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Eventlisteners
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);

// Functions
function addTodo(event){
    // handle form refresh
    event.preventDefault();
    
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")

    todoDiv.appendChild(newTodo);

    // Check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");

    todoDiv.appendChild(completeButton);

    // Delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    // Clearing the inpur
    todoInput.value =""
}

// Delete
function deleteCheck(event){
    const item = event.target;
    console.log(item.classList)
    // Delete
    if(item.classList[0] === "trash-btn"){
        const parentItem = item.parentElement;
        parentItem.remove()
    }

    if(item.classList[0] === "complete-btn"){
        const parentItem = item.parentElement;
        parentItem.classList.toggle("completed")
    }
}