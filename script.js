const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const editPopup = document.createElement("div");
editPopup.id = "edit-popup";
editPopup.style.display = "none";

const editBox = document.createElement("div");
editBox.id = "edit-box";

const editInput = document.createElement("input");
editInput.type = "text";
editInput.className = "edit-input";

const buttonContainer = document.createElement("div");
buttonContainer.className = "edit-btns";

const saveBtn = document.createElement("button");
saveBtn.textContent = "Save";

const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";

buttonContainer.append(cancelBtn, saveBtn);
editBox.append(editInput, buttonContainer);
editPopup.append(editBox);
document.body.append(editPopup);

let editingIndex = null;
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.marginTop = "6px";
    checkbox.addEventListener("change", () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "#666fbb";
      span.style.opacity = "0.7";
    }

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "🖉";
    editBtn.title = "Edit task";
    editBtn.addEventListener("click", () => {
      editingIndex = index;
      editInput.value = todos[index].text;
      editPopup.style.display = "flex";
      editInput.focus();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.title = "Remove task";
    removeBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    buttonDiv.append(editBtn, removeBtn);

    li.append(checkbox, span, buttonDiv);
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

saveBtn.addEventListener("click", () => {
  const newText = editInput.value.trim();
  if (newText && editingIndex !== null) {
    todos[editingIndex].text = newText;
    saveTodos();
    renderTodos();
    editingIndex = null;
    editPopup.style.display = "none";
  }
});

cancelBtn.addEventListener("click", () => {
  editingIndex = null;
  editPopup.style.display = "none";
});

editPopup.addEventListener("click", (e) => {
  if (e.target === editPopup) {
    editingIndex = null;
    editPopup.style.display = "none";
  }
});
