# To-Do List

A simple, beginner-friendly To-Do List web app designed with a sleek dark theme. It allows users to add, edit, remove, and mark tasks as completed. All task data is saved locally in the browser, ensuring tasks persist between sessions without any server-side backend.

## Features

- Add Tasks: Enter new tasks via input and add button.
- Remove Tasks: Delete tasks with a fixed-position "✖" button.
- Edit Tasks: Edit tasks inline via a custom popup modal with Save and Cancel options (avoids browser prompts).
- Mark Tasks Complete: Checkbox toggles completed state with line-through style.
- Dark UI: Clean, easy-to-read dark themed design with consistent button styling.
- Responsive Text Wrapping: (*UI Bug Fixed*) Long tasks wrap onto multiple lines without shifting the edit and delete buttons.
- Local Storage Persistence: Tasks saved and loaded from localStorage automatically.

## Technologies Used

- HTML5
- CSS3 (Flexbox for layout, dark mode styling)
- Vanilla JavaScript (DOM manipulation, event handling, localStorage)

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).

## Folder Structure
.
├── index.html # Main HTML file
├── style.css # Dark mode styling and layout
└── script.js # Task list logic, DOM manipulation, event handling

## How to Use

- Type your task in the input field and click the "+" button or press Enter.
- Click the checkbox on the left to mark a task complete or incomplete.
- Click the pencil (🖉) button on the right to edit the task text. A popup will appear; enter the new text and click Save or Cancel.
- Click the cross (✖) button on the right to delete the task.

## Notes

- The task text will wrap onto multiple lines if it is long but the edit and remove buttons stay fixed on the right side(*UI Bug Fixed*).
- The application works fully on the client side; no backend setup required.

## License

This project is open-source and freely available to learn from and modify.

---

