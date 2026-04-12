import './style.css';
import { createTodoCard } from './components/TodoCard/TodoCard.js';

const todoData = {
  id: '12345',
  title: 'Complete HNG Stage 0',
  description:
    'Implement the Todo Card component with semantic HTML and data-testid attributes.',
  priority: 'High',
  status: 'In Progress',
  dueDateISO: '2026-04-12T23:59:59Z',
  dueDateFormatted: 'April 12, 2026',
  timeRemaining: '10 hours',
  tags: ['hng', 'stage-0', 'frontend'],
  completed: false,
};

const container = document.querySelector('#todo-card-container');
container.innerHTML = createTodoCard(todoData);

// Toggle Handler
const checkbox = container.querySelector(
  '[data-testid="test-todo-complete-toggle"]'
);
const card = container.querySelector('.todo-card');
const statusElement = container.querySelector(
  '[data-testid="test-todo-status"]'
);
const originalStatus = todoData.status;

checkbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    statusElement.textContent = 'Done';
    card.classList.add('todo-completed');
  } else {
    statusElement.textContent = originalStatus;
    card.classList.remove('todo-completed');
  }
});
