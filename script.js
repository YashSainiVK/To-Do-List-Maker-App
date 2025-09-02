const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    todoList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const task = input.value.trim();
  if (task) {
    todos.push(task);
    saveTodos();
    input.value = "";
    renderTodos();
  }
};

window.onload = renderTodos;
