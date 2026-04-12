import './style.css';
import { createTodoCard } from './components/TodoCard/TodoCard.js';
import { getTimeRemaining } from './utils/time.js';

const todoData = {
  id: 'hng-task-0',
  title: 'Complete HNG Stage 0',
  description:
    'Implement the Todo Card component with semantic HTML, accessibility features, and data-testid attributes.',
  priority: 'High',
  status: 'In Progress',
  dueDateISO: '2026-04-16T22:59:59.000Z',
  tags: ['hng', 'stage-0', 'frontend'],
  completed: false,
};

// Compute dynamic date formatting
const initialDate = new Date(todoData.dueDateISO);
todoData.dueDateFormatted = `${new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
}).format(initialDate)}`;

// Compute INITIAL time remaining
todoData.timeRemaining = getTimeRemaining(todoData.dueDateISO);

const container = document.querySelector('#todo-card-container');

if (container) {
  container.innerHTML = createTodoCard(todoData);

  // --- DOM Wiring ---
  const card = container.querySelector('.todo-card');
  const checkbox = container.querySelector(
    '[data-testid="test-todo-complete-toggle"]'
  );
  const statusElement = container.querySelector(
    '[data-testid="test-todo-status"]'
  );
  const editBtn = container.querySelector(
    '[data-testid="test-todo-edit-button"]'
  );
  const deleteBtn = container.querySelector(
    '[data-testid="test-todo-delete-button"]'
  );

  const timeDisplayElement = container.querySelector(
    '[data-testid="test-todo-time-remaining"]'
  );

  const originalStatus = todoData.status;

  // Initial state sync
  if (todoData.completed && card) {
    card.classList.add('is-done');
  }

  // Checkbox toggle handler
  if (checkbox && card && statusElement) {
    checkbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      todoData.completed = isChecked;

      if (isChecked) {
        statusElement.textContent = 'Done';
        card.classList.add('is-done');
        console.log(`Todo "${todoData.title}" marked as complete.`);
      } else {
        statusElement.textContent = originalStatus;
        card.classList.remove('is-done');
        console.log(`Todo "${todoData.title}" marked as pending.`);
      }
    });
  }

  // Edit button handler
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      console.log(`Edit button clicked for todo: "${todoData.title}"`);
    });
  }

  // Delete button handler
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      console.log(`Delete button clicked for todo: "${todoData.title}"`);
    });
  }

  if (timeDisplayElement && !todoData.completed) {
    setInterval(() => {
      const newTimeText = getTimeRemaining(todoData.dueDateISO);

      if (timeDisplayElement.textContent !== newTimeText) {
        timeDisplayElement.textContent = newTimeText;
      }
    }, 60000);
  }
}
