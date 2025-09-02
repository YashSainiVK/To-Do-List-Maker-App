const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text || task;              //  to handle object or string if localstorage

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";                       //Replace with your X icon later
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    li.appendChild(removeBtn);
    todoList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const task = input.value.trim();
  if (task) {
    todos.push({ text: task }); //store as objetc for later feature
    saveTodos();
    input.value = "";
    renderTodos();
  }
};

window.onload = renderTodos;
