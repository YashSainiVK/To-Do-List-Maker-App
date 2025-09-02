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

    const span = document.createElement("span");
    span.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.style.marginLeft = "10px";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null) {
        const trimmedText = newText.trim();
        if (trimmedText !== "") {
          todos[index].text = trimmedText;
          saveTodos();
          renderTodos();
        }
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText) {
    todos.push({ text: taskText, completed: false });
    saveTodos();
    input.value = "";
    renderTodos();
  }
});

window.onload = renderTodos;
