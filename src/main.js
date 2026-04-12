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
  dueDateISO: '2026-04-12T23:59:59Z',
  dueDateFormatted: 'April 12, 2026',
  tags: ['hng', 'stage-0', 'frontend'],
  completed: false,
};

// Compute dynamic time remaining
todoData.timeRemaining = getTimeRemaining(todoData.dueDateISO);

const container = document.querySelector('#todo-card-container');

if (container) {
  container.innerHTML = createTodoCard(todoData);

  // DOM Wiring
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
      console.log(
        `Edit button clicked for todo: "${todoData.title}" (ID: ${todoData.id})`
      );
    });
  }

  // Delete button handler
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      console.log(
        `Delete button clicked for todo: "${todoData.title}" (ID: ${todoData.id})`
      );
    });
  }
}
