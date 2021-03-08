// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

// Eventlisteners
document.addEventListener("DOMContentLoaded",getLoaclTasks);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
todoFilter.addEventListener("click",filterTodo);

// Functions
function addTodo(event){
    // handle form refresh
    event.preventDefault();


    /* Saving data to localStorage */
    saveLoaclTasks(todoInput.value)
    
    // todo div
    const todoDiv = document.createElement("div");
    /* classList - All the class mentioned for an HTML Elemebt */
    todoDiv.classList.add("todo");

    // li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")

    /* appendChild - Appends to the childNodes */
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
    todoInput.value = ""
}

// Delete
function deleteCheck(event){
    const item = event.target;
    console.log(item.classList)
    // Delete
    if(item.classList[0] === "trash-btn"){
        const parentItem = item.parentElement;
        // animation
        parentItem.classList.add("fall")
        removeFromLocalStorage(parentItem)
        parentItem.addEventListener("transitionend",() => {
            parentItem.remove()
        })
    }

    if(item.classList[0] === "complete-btn"){
        const parentItem = item.parentElement;
        parentItem.classList.toggle("completed")
    }
}
// Filter
function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        if(todo && todo.style){
        switch(event.target.value){
            case "all" : 
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    }
    })

}

/* Saving to local Storage */
function saveLoaclTasks(value){
    let todo;
    if(!localStorage.getItem("todo")){
        todo = []
    }else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    todo.push(value)
    localStorage.setItem("todo",JSON.stringify(todo))
}
/* get from local Storage */
function getLoaclTasks(){
    let todo;
    if(!localStorage.getItem("todo")){
        todo = []
    }else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    todo.forEach((todoTask)=> {
        // todo div
    const todoDiv = document.createElement("div");
    /* classList - All the class mentioned for an HTML Elemebt */
    todoDiv.classList.add("todo");

    // li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoTask;
    newTodo.classList.add("todo-item")

    /* appendChild - Appends to the childNodes */
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
    })
}

function removeFromLocalStorage(value){
    let todo;
    if(!localStorage.getItem("todo")){
        todo = []
    }else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    const text = value.children[0].innerText;
    todo.splice(todo.indexOf(text),1)
    localStorage.setItem("todo",JSON.stringify(todo))
}