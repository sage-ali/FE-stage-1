import './style.css';
import { createTodoCardComponent, initTodoCardUpdates } from './components/TodoCard/TodoCard.js';

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

// Initial time remaining (used for initial render, will be updated by initTodoCardUpdates)
todoData.timeRemaining = 'Due in 6 hours';

const container = document.querySelector('#todo-card-container');

if (container) {
  // Create and render the component using the stateful component factory
  const component = createTodoCardComponent(container, todoData);
  component.render();

  // Initialize polling updates for time remaining and overdue indicator
  const cleanupUpdates = initTodoCardUpdates(container, todoData);

  // --- Helper: Focus Trap for Edit Mode ---
  let focusTrapListener = null;

  /**
   * Enable focus trap within the edit form.
   */
  function enableFocusTrap(form) {
    const focusableSelectors = [
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'button:not([disabled])',
    ].join(', ');

    const focusableElements = form.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    focusTrapListener = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      // Escape key exits edit mode
      if (e.key === 'Escape') {
        e.preventDefault();
        component.setState({ isEditing: false });
        if (component.elements.editButton) {
          component.elements.editButton.focus();
        }
        disableFocusTrap();
      }
    };

    form.addEventListener('keydown', focusTrapListener);
  }

  /**
   * Disable focus trap.
   */
  function disableFocusTrap() {
    if (focusTrapListener) {
      const form = component.elements.editForm;
      if (form) {
        form.removeEventListener('keydown', focusTrapListener);
      }
      focusTrapListener = null;
    }
  }

  // --- Event Handlers ---

  // Expand/Collapse toggle
  if (component.elements.expandToggle) {
    const toggle = component.elements.expandToggle;

    toggle.addEventListener('click', () => {
      component.setState({ isExpanded: !component.state.isExpanded });
    });

    // Keyboard accessibility for Enter/Space
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        component.setState({ isExpanded: !component.state.isExpanded });
      }
    });
  }

  // Edit button
  if (component.elements.editButton) {
    component.elements.editButton.addEventListener('click', () => {
      const { editTitle, editDescription, editPriority, editDueDate } = component.elements;

      // Pre-populate form fields from current state
      if (editTitle) editTitle.value = component.state.data.title;
      if (editDescription) editDescription.value = component.state.data.description;
      if (editPriority) editPriority.value = component.state.data.priority;
      if (editDueDate) {
        const dateVal = component.state.data.dueDate
          ? component.state.data.dueDate.split('T')[0]
          : '';
        editDueDate.value = dateVal;
      }

      // Enter edit mode
      component.setState({ isEditing: true });

      // Focus first input
      if (editTitle) editTitle.focus();

      // Enable focus trap
      if (component.elements.editForm) {
        enableFocusTrap(component.elements.editForm);
      }
    });
  }

  // Cancel button
  if (component.elements.cancelButton) {
    component.elements.cancelButton.addEventListener('click', () => {
      component.setState({ isEditing: false });
      if (component.elements.editButton) {
        component.elements.editButton.focus();
      }
      disableFocusTrap();
    });
  }

  // Save button / form submit
  if (component.elements.editForm) {
    component.elements.editForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const { editTitle, editDescription, editPriority, editDueDate } = component.elements;

      // Collect form values
      const newTitle = editTitle?.value?.trim();
      const newDescription = editDescription?.value?.trim();
      const newPriority = editPriority?.value;
      const newDueDate = editDueDate?.value;

      // Basic validation
      if (!newTitle) {
        editTitle?.focus();
        return;
      }

      // Update state with new values
      component.setState({
        isEditing: false,
        data: {
          title: newTitle,
          description: newDescription,
          priority: newPriority,
          dueDate: newDueDate ? `${newDueDate}T00:00:00.000Z` : component.state.data.dueDate,
        },
      });

      if (component.elements.editButton) {
        component.elements.editButton.focus();
      }
      disableFocusTrap();
    });
  }

  // Checkbox change
  if (component.elements.checkbox) {
    component.elements.checkbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;

      // Sync: checkbox affects status
      component.setState({
        data: {
          completed: isChecked,
          status: isChecked ? 'Done' : component.state.data.status === 'Done' ? 'Pending' : component.state.data.status,
        },
      });
    });
  }

  // Status select change
  if (component.elements.statusSelect) {
    component.elements.statusSelect.addEventListener('change', (e) => {
      const newStatus = e.target.value;

      // Sync: dropdown affects completed and status
      component.setState({
        data: {
          status: newStatus,
          completed: newStatus === 'Done',
        },
      });
    });
  }

  // Delete button
  if (component.elements.deleteButton) {
    component.elements.deleteButton.addEventListener('click', () => {
      console.log(`Delete button clicked for todo: "${component.state.data.title}"`);
    });
  }
}