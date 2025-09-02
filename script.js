const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Custom edit popup elements (created dynamically)
const editPopup = document.createElement("div");
editPopup.style.position = "fixed";
editPopup.style.top = "0";
editPopup.style.left = "0";
editPopup.style.width = "100vw";
editPopup.style.height = "100vh";
editPopup.style.background = "rgba(0,0,0,0.5)";
editPopup.style.display = "none";
editPopup.style.justifyContent = "center";
editPopup.style.alignItems = "center";
editPopup.style.zIndex = "1000";

const editBox = document.createElement("div");
editBox.style.background = "white";
editBox.style.padding = "20px";
editBox.style.borderRadius = "8px";
editBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
editBox.style.display = "flex";
editBox.style.flexDirection = "column";
editBox.style.width = "300px";

const editInput = document.createElement("input");
editInput.type = "text";
editInput.style.padding = "8px";
editInput.style.fontSize = "16px";
editInput.style.marginBottom = "12px";
editInput.style.border = "1px solid #ccc";
editInput.style.borderRadius = "4px";

const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "flex-end";
buttonContainer.style.gap = "10px";

const saveBtn = document.createElement("button");
saveBtn.textContent = "Save";
saveBtn.style.background = "#377dff";
saveBtn.style.color = "white";
saveBtn.style.border = "none";
saveBtn.style.padding = "8px 16px";
saveBtn.style.borderRadius = "4px";
saveBtn.style.cursor = "pointer";

const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.style.background = "#ccc";
cancelBtn.style.border = "none";
cancelBtn.style.padding = "8px 16px";
cancelBtn.style.borderRadius = "4px";
cancelBtn.style.cursor = "pointer";

buttonContainer.appendChild(cancelBtn);
buttonContainer.appendChild(saveBtn);
editBox.appendChild(editInput);
editBox.appendChild(buttonContainer);
editPopup.appendChild(editBox);
document.body.appendChild(editPopup);

let editingIndex = null;

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.marginLeft = "10px";
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "#a7c2e7";
      span.style.opacity = "0.7";
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.style.marginLeft = "10px";

    editBtn.addEventListener("click", () => {
      editingIndex = index;
      editInput.value = todos[editingIndex].text;
      editPopup.style.display = "flex";
      editInput.focus();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.style.marginLeft = "10px";

    removeBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
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
