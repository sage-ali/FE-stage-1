import { escapeHTML, makeSafeId } from '../../utils/html.js';
import './TodoCard.css';

/**
 * Creates an HTML template string for a todo card.
 * @param {Object} todo - The todo object.
 * @param {string} todo.id - The unique identifier for the todo.
 * @param {string} todo.title - The title of the todo.
 * @param {string} todo.description - The description of the todo.
 * @param {string} todo.priority - The priority level (e.g., 'High', 'Medium', 'Low').
 * @param {string} todo.status - The current status of the todo.
 * @param {string} todo.dueDateISO - The due date in ISO 8601 format.
 * @param {string} todo.dueDateFormatted - The due date in a human-readable format.
 * @param {string} todo.timeRemaining - The computed time remaining string.
 * @param {string[]} todo.tags - An array of tags associated with the todo.
 * @param {boolean} todo.completed - Whether the todo is marked as complete.
 * @returns {string} The HTML template string for the todo card.
 */
export function createTodoCard(todo) {
  const title = escapeHTML(todo.title);
  const description = escapeHTML(todo.description);
  const priority = escapeHTML(todo.priority);
  const status = escapeHTML(todo.status);
  const dueDateFormatted = escapeHTML(todo.dueDateFormatted);
  const timeRemaining = escapeHTML(todo.timeRemaining);
  const dueDateISO = escapeHTML(todo.dueDateISO);
  const safeId = makeSafeId(todo.id);

  const cardClasses = ['todo-card'];
  if (todo.completed) {
    cardClasses.push('is-done');
  }

  const priorityLower = priority.toLowerCase();

  return `
    <article class="${cardClasses.join(' ')}" data-testid="test-todo-card">
      <header class="todo-card__header">
        <h3 class="todo-card__title" data-testid="test-todo-title">
          ${todo.completed ? '<span class="sr-only">Completed: </span>' : ''}
          ${title}
        </h3>
        <p class="todo-card__description" data-testid="test-todo-description">${description}</p>
      </header>

      <div class="todo-card__meta" role="group" aria-label="Todo metadata">
        <dl>
          <div class="todo-card__meta-item">
            <dt>Priority</dt>
            <dd>
              <span class="todo-card__priority" data-priority="${priorityLower}" data-testid="test-todo-priority">${priority}</span>
              <span class="todo-card__priority-indicator" data-testid="test-todo-priority-indicator" aria-hidden="true"></span>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Status</dt>
            <dd class="todo-card__status-wrapper">
              <span data-testid="test-todo-status">${status}</span>
              <select class="todo-card__status-control" data-testid="test-todo-status-control" aria-label="Change status">
                <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Done" ${status === 'Done' || todo.completed ? 'selected' : ''}>Done</option>
              </select>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Due Date</dt>
            <dd>
              <time data-testid="test-todo-due-date" datetime="${dueDateISO}">${dueDateFormatted}</time>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Time Remaining</dt>
            <dd class="todo-card__time-remaining-wrapper">
              <time data-testid="test-todo-time-remaining" datetime="${dueDateISO}">${timeRemaining}</time>
              <span class="todo-card__overdue-indicator" data-testid="test-todo-overdue-indicator" hidden>Overdue</span>
            </dd>
          </div>
        </dl>
      </div>

      <section class="todo-card__tags-section" data-testid="test-todo-tags-section">
        <div class="todo-card__tags-header">
          <h4>Tags</h4>
          <button type="button" class="todo-card__expand-toggle" data-testid="test-todo-expand-toggle" aria-expanded="true" aria-controls="test-todo-collapsible-section">▼</button>
        </div>
        <section id="test-todo-collapsible-section" class="todo-card__collapsible" data-testid="test-todo-collapsible-section">
          <ul class="todo-card__tags tag-list" data-testid="test-todo-tags" aria-label="Tags list">
            ${(Array.isArray(todo.tags) ? todo.tags : [])
              .map(
                (tag) =>
                  `<li class="todo-card__tag" data-testid="test-todo-tag-${makeSafeId(tag)}">${escapeHTML(tag)}</li>`
              )
              .join('')}
          </ul>
        </section>
      </section>

      <form class="todo-card__edit-form" data-testid="test-todo-edit-form" hidden>
        <div class="todo-card__edit-field">
          <label for="edit-title-${safeId}">Title</label>
          <input type="text" id="edit-title-${safeId}" data-testid="test-todo-edit-title-input" placeholder="Enter title" value="${title}">
        </div>
        <div class="todo-card__edit-field">
          <label for="edit-description-${safeId}">Description</label>
          <textarea id="edit-description-${safeId}" data-testid="test-todo-edit-description-input" placeholder="Enter description">${description}</textarea>
        </div>
        <div class="todo-card__edit-field">
          <label for="edit-priority-${safeId}">Priority</label>
          <select id="edit-priority-${safeId}" data-testid="test-todo-edit-priority-select">
            <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
          </select>
        </div>
        <div class="todo-card__edit-field">
          <label for="edit-due-date-${safeId}">Due Date</label>
          <input type="datetime-local" id="edit-due-date-${safeId}" data-testid="test-todo-edit-due-date-input" value="${todo.dueDateISO ? todo.dueDateISO.slice(0, 16) : ''}">
        </div>
        <div class="todo-card__edit-actions">
          <button type="submit" class="todo-card__btn todo-card__btn--primary" data-testid="test-todo-save-button">Save</button>
          <button type="button" class="todo-card__btn" data-testid="test-todo-cancel-button">Cancel</button>
        </div>
      </form>

      <footer class="todo-card__footer">
        <label for="todo-complete-${safeId}">
          <input type="checkbox" id="todo-complete-${safeId}" data-testid="test-todo-complete-toggle" ${todo.completed ? 'checked' : ''}>
          Mark as complete
        </label>
        <div class="todo-card__actions">
          <button type="button" class="todo-card__btn" data-testid="test-todo-edit-button" aria-label="Edit ${title}">Edit</button>
          <button type="button" class="todo-card__btn" data-testid="test-todo-delete-button" aria-label="Delete ${title}">Delete</button>
        </div>
      </footer>
    </article>
  `;
}

/**
 * Creates a stateful TodoCard component instance.
 * @param {HTMLElement} containerElement - The container element to render the card into.
 * @param {Object} initialTodo - The initial todo data.
 * @returns {Object} The component instance with state and methods.
 */
export function createTodoCardComponent(containerElement, initialTodo) {
  // Internal state
  const state = {
    isEditing: false,
    isExpanded: false,
    data: {
      title: initialTodo.title || '',
      description: initialTodo.description || '',
      status: initialTodo.status || '',
      priority: initialTodo.priority || '',
      dueDate: initialTodo.dueDateISO || initialTodo.dueDate || '',
      dueDateFormatted: initialTodo.dueDateFormatted || '',
      timeRemaining: initialTodo.timeRemaining || '',
      tags: initialTodo.tags || [],
      completed: initialTodo.completed || false,
      id: initialTodo.id || '',
    },
  };

  // Cached DOM element references
  let elements = {};

  /**
   * Updates the UI based on current state.
   * This method is idempotent - safe to call repeatedly.
   */
  function updateUI() {
    // Update text content for title, description, status, priority
    if (elements.title) {
      elements.title.textContent = state.data.completed
        ? `Completed: ${state.data.title}`
        : state.data.title;
    }
    if (elements.description) {
      elements.description.textContent = state.data.description;
    }
    if (elements.status) {
      elements.status.textContent = state.data.completed ? 'Done' : state.data.status;
    }
    if (elements.priority) {
      elements.priority.textContent = state.data.priority;
      elements.priority.setAttribute('data-priority', state.data.priority.toLowerCase());
    }

    // Update due date and time remaining
    if (elements.dueDate) {
      elements.dueDate.setAttribute('datetime', state.data.dueDate);
      elements.dueDate.textContent = state.data.dueDateFormatted;
    }
    if (elements.timeRemaining) {
      elements.timeRemaining.setAttribute('datetime', state.data.dueDate);
      elements.timeRemaining.textContent = state.data.timeRemaining;
    }

    // Toggle CSS classes on card root
    if (elements.card) {
      // Toggle is-editing class
      if (state.isEditing) {
        elements.card.classList.add('is-editing');
      } else {
        elements.card.classList.remove('is-editing');
      }

      // Toggle is-expanded class
      if (state.isExpanded) {
        elements.card.classList.add('is-expanded');
      } else {
        elements.card.classList.remove('is-expanded');
      }

      // Toggle is-done class based on completed state
      if (state.data.completed) {
        elements.card.classList.add('is-done');
      } else {
        elements.card.classList.remove('is-done');
      }
    }

    // Update checkbox checked state
    if (elements.checkbox) {
      elements.checkbox.checked = state.data.completed;
    }
  }

  /**
   * Renders the component into the container element.
   */
  function render() {
    // Use the existing HTML template logic
    containerElement.innerHTML = createTodoCard(state.data);

    // Cache frequently-updated DOM element references
    elements.card = containerElement.querySelector('[data-testid="test-todo-card"]');
    elements.title = containerElement.querySelector('[data-testid="test-todo-title"]');
    elements.description = containerElement.querySelector('[data-testid="test-todo-description"]');
    elements.status = containerElement.querySelector('[data-testid="test-todo-status"]');
    elements.priority = containerElement.querySelector('[data-testid="test-todo-priority"]');
    elements.dueDate = containerElement.querySelector('[data-testid="test-todo-due-date"]');
    elements.timeRemaining = containerElement.querySelector('[data-testid="test-todo-time-remaining"]');
    elements.checkbox = containerElement.querySelector('[data-testid="test-todo-complete-toggle"]');
    elements.editButton = containerElement.querySelector('[data-testid="test-todo-edit-button"]');
    elements.deleteButton = containerElement.querySelector('[data-testid="test-todo-delete-button"]');

    // Apply initial state to UI
    updateUI();
  }

  /**
   * Updates the component state.
   * @param {Object} partialState - Partial state object to merge into current state.
   */
  function setState(partialState) {
    if (!partialState) return;

    // Shallow merge top-level properties (isEditing, isExpanded)
    if (partialState.isEditing !== undefined) {
      state.isEditing = partialState.isEditing;
    }
    if (partialState.isExpanded !== undefined) {
      state.isExpanded = partialState.isExpanded;
    }

    // Deep merge updates into state.data
    if (partialState.data) {
      state.data = {
        ...state.data,
        ...partialState.data,
      };
    }

    // Automatically call updateUI after merge
    updateUI();
  }

  // Return the component instance
  return {
    state,
    render,
    updateUI,
    setState,
    elements, // Expose elements for event handler wiring
  };
}
