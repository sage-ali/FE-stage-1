import './style.css';
import { createTodoCardComponent } from './components/TodoCard/TodoCard.js';
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
todoData.dueDateFormatted = `${new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
}).format(initialDate)}`;

// Compute INITIAL time remaining
todoData.timeRemaining = getTimeRemaining(todoData.dueDateISO);

const container = document.querySelector('#todo-card-container');

if (container) {
  // Create and render the component using the stateful component factory
  const component = createTodoCardComponent(container, todoData);
  component.render();

  // --- Event Handlers ---

  // Checkbox toggle handler - uses setState for state-driven updates
  if (component.elements && component.elements.checkbox) {
    component.elements.checkbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;

      // Update state - status text and is-done class toggling flows through updateUI()
      component.setState({ data: { completed: isChecked } });

      if (isChecked) {
        console.log(`Todo "${todoData.title}" marked as complete.`);
      } else {
        console.log(`Todo "${todoData.title}" marked as pending.`);
      }
    });
  }

  // Edit button handler - console.log stub with access to component state
  if (component.elements && component.elements.editButton) {
    component.elements.editButton.addEventListener('click', () => {
      console.log(`Edit button clicked for todo: "${component.state.data.title}"`);
    });
  }

  // Delete button handler - console.log stub with access to component state
  if (component.elements && component.elements.deleteButton) {
    component.elements.deleteButton.addEventListener('click', () => {
      console.log(`Delete button clicked for todo: "${component.state.data.title}"`);
    });
  }

  // Time remaining update - uses setState for state-driven updates
  if (component.elements && component.elements.timeRemaining && !todoData.completed) {
    setInterval(() => {
      const newTimeText = getTimeRemaining(todoData.dueDateISO);

      // Apply time remaining via setState
      component.setState({ data: { timeRemaining: newTimeText } });
    }, 60000);
  }
}
