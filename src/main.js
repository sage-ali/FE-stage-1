import './style.css';
import { createTodoCard } from './components/TodoCard/TodoCard.js';

const todoData = {
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

document.querySelector('#todo-card-container').innerHTML =
  createTodoCard(todoData);
