const toDoInput = document.querySelector(".new-todo");
const ul = document.querySelector(".todo-list");
const toDoList = document.querySelector(".todo-list");

toDoInput.addEventListener("change", createToDo);
let toDoes = JSON.parse(localStorage.getItem("todoes")) || [];

if (localStorage.getItem("todoes")) {
  toDoes.map(todo => createDOMelements(todo));
}

function remove(e) {
  e.preventDefault();
  const todo = this.parentNode.parentNode.parentNode;
  const value = this.parentNode.parentNode.querySelector(".todo-lable").innerText;
  toDoes = toDoes.filter(el => el.toLowerCase() !== value.toLowerCase() );
  localStorage.setItem("todoes", JSON.stringify(toDoes));

  ul.removeChild(todo);
}

function confirm () {
  const input = this.parentNode.parentNode.querySelector(".edit-input");
  const lable = this.parentNode.parentNode.querySelector(".todo-lable");
  const lableValue = lable.innerText;

  const confirmBtn = this.parentNode.parentNode.querySelector(".confirm-btn");
  const button = this.parentNode.parentNode.querySelector(".edit-btn");

  input.style.display = "none";
  lable.innerText = lableValue;
  button.style.display = "initial";
  confirmBtn.style.display = "none";
  lable.style.display = "initial";

  input.onchange = function () {
    lable.innerText = lableValue;
  }
}

function edit(e) {
  e.preventDefault();

  const input = this.parentNode.parentNode.querySelector(".edit-input");
  const lable = this.parentNode.parentNode.querySelector(".todo-lable");
  const editButton = this.parentNode.parentNode.querySelector(".edit-btn");
  const confirmBtn = this.parentNode.parentNode.querySelector(".confirm-btn");
  const lableValue = lable.innerText;

  editButton.style.display = "none";
  confirmBtn.style.display = "initial";
  lable.style.display = "none";
  input.style.display = "inline";
  input.value = lableValue;

  input.onchange = function(e) {
    e.preventDefault();
    const value = !input.value ? lableValue : input.value;
    toDoes = toDoes.filter(el => el.toLowerCase() !== lableValue.toLowerCase());
    toDoes.push(value);
    
    localStorage.setItem("todoes", JSON.stringify(toDoes));
    lable.innerText = value;
  }
}

function createDOMelements (value) {
  const todoBox = document.createElement("li");
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const todoNameBox = document.createElement("div");
  todoNameBox.classList.add("todo-name-box");
  const todo = document.createElement("lable");
  todo.innerHTML = value;
  todo.classList.add("todo-lable");
  const inputTodo = document.createElement("input");
  inputTodo.type = "text";
  inputTodo.classList.add("edit-input");
  todoNameBox.append(inputTodo, todo);

  const buttonBox = document.createElement("div");
  buttonBox.classList.add("button-box");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerText = "Edit";
  editBtn.onclick = edit;

  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.style.display = "none";
  confirmBtn.innerText = "Ok";
  confirmBtn.onclick = confirm;

  const removeToDo = document.createElement("button");
  removeToDo.classList.add("remove-btn");
  removeToDo.innerText = "Remove";
  removeToDo.onclick = remove;
  buttonBox.append(editBtn, confirmBtn, removeToDo);
  todoContainer.append(todoNameBox, buttonBox);
  todoBox.append(todoContainer);
  toDoList.appendChild(todoBox);
};

function createToDo(e) {
  e.preventDefault();
  
  const newToDo = this.value;
  toDoes.push(newToDo.toLowerCase());
  localStorage.setItem("todoes", JSON.stringify(toDoes));
  createDOMelements(newToDo);
  this.value = '';
}