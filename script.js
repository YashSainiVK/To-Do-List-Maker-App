const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const todos = [];

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
    input.value = "";
    renderTodos();
  }
};
