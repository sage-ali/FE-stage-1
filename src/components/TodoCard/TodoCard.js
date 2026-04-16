import { escapeHTML, makeSafeId } from '../../utils/html.js';
import { getTimeRemaining, isOverdue } from '../../utils/time.js';
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

  const cardClasses = ['todo-card', 'todo-card--viewing'];
  if (todo.completed) {
    cardClasses.push('is-done');
  }

  const priorityLower = priority.toLowerCase();

  // Determine if this is the "Done" status
  const isDoneStatus = status === 'Done' || todo.completed;
  const statusValue = isDoneStatus ? 'Done' : status;

  // Extract date for date input (YYYY-MM-DD format)
  const dateValue = dueDateISO ? dueDateISO.split('T')[0] : '';

  return `
    <article class="${cardClasses.join(' ')}" data-testid="test-todo-card">
      <header class="todo-card__header">
        <h3 class="todo-card__title" data-testid="test-todo-title">
          ${todo.completed ? '<span class="sr-only">Completed: </span>' : ''}
          ${title}
        </h3>

        <!-- Expand/Collapse toggle -->
        <button
          type="button"
          class="todo-card__expand-toggle"
          data-testid="test-todo-expand-toggle"
          aria-expanded="false"
          aria-controls="todo-description-${safeId}"
          aria-label="Toggle description visibility"
        >▾</button>

        <!-- View mode description -->
        <p class="todo-card__description"
           data-testid="test-todo-description"
           id="todo-description-${safeId}">${description}</p>

        <!-- Edit form (hidden by default) -->
        <form class="todo-card__edit-form"
              data-testid="test-todo-edit-form"
              hidden>
          <div class="todo-card__edit-field">
            <label for="edit-title-${safeId}">Title</label>
            <input type="text"
                   id="edit-title-${safeId}"
                   name="title"
                   data-testid="test-todo-edit-title"
                   value="${title}"
                   required>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-description-${safeId}">Description</label>
            <textarea id="edit-description-${safeId}"
                      name="description"
                      data-testid="test-todo-edit-description">${description}</textarea>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-priority-${safeId}">Priority</label>
            <select id="edit-priority-${safeId}"
                    name="priority"
                    data-testid="test-todo-edit-priority">
              <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
              <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
          </div>

          <div class="todo-card__edit-field">
            <label for="edit-due-date-${safeId}">Due Date</label>
            <input type="date"
                   id="edit-due-date-${safeId}"
                   name="dueDate"
                   data-testid="test-todo-edit-due-date"
                   value="${dateValue}">
          </div>

          <div class="todo-card__edit-actions">
            <button type="button"
                    class="todo-card__btn todo-card__btn--secondary"
                    data-testid="test-todo-cancel-button">Cancel</button>
            <button type="submit"
                    class="todo-card__btn todo-card__btn--primary"
                    data-testid="test-todo-save-button">Save</button>
          </div>
        </form>
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
            <dd data-testid="test-todo-status">${status}</dd>
            <select class="todo-card__status-select"
                    data-testid="test-todo-status-select"
                    aria-label="Change status">
              <option value="Pending" ${statusValue === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="In Progress" ${statusValue === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Done" ${statusValue === 'Done' ? 'selected' : ''}>Done</option>
            </select>
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
        elements.card.classList.remove('todo-card--viewing');
        elements.card.classList.add('todo-card--editing');
      } else {
        elements.card.classList.remove('is-editing');
        elements.card.classList.remove('todo-card--editing');
        elements.card.classList.add('todo-card--viewing');
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

    // Update expand toggle aria-expanded
    if (elements.expandToggle) {
      elements.expandToggle.setAttribute('aria-expanded', state.isExpanded ? 'true' : 'false');
    }

    // Update checkbox checked state
    if (elements.checkbox) {
      elements.checkbox.checked = state.data.completed;
    }

    // Update status select value
    if (elements.statusSelect) {
      elements.statusSelect.value = state.data.completed ? 'Done' : state.data.status;
    }

    // Toggle edit form visibility
    if (elements.editForm) {
      elements.editForm.hidden = !state.isEditing;
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
    elements.statusSelect = containerElement.querySelector('[data-testid="test-todo-status-select"]');
    elements.priority = containerElement.querySelector('[data-testid="test-todo-priority"]');
    elements.dueDate = containerElement.querySelector('[data-testid="test-todo-due-date"]');
    elements.timeRemaining = containerElement.querySelector('[data-testid="test-todo-time-remaining"]');
    elements.checkbox = containerElement.querySelector('[data-testid="test-todo-complete-toggle"]');
    elements.editButton = containerElement.querySelector('[data-testid="test-todo-edit-button"]');
    elements.deleteButton = containerElement.querySelector('[data-testid="test-todo-delete-button"]');
    elements.expandToggle = containerElement.querySelector('[data-testid="test-todo-expand-toggle"]');
    elements.editForm = containerElement.querySelector('[data-testid="test-todo-edit-form"]');
    elements.saveButton = containerElement.querySelector('[data-testid="test-todo-save-button"]');
    elements.cancelButton = containerElement.querySelector('[data-testid="test-todo-cancel-button"]');
    elements.editTitle = containerElement.querySelector('[data-testid="test-todo-edit-title"]');
    elements.editDescription = containerElement.querySelector('[data-testid="test-todo-edit-description"]');
    elements.editPriority = containerElement.querySelector('[data-testid="test-todo-edit-priority"]');
    elements.editDueDate = containerElement.querySelector('[data-testid="test-todo-edit-due-date"]');

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

/**
 * Initializes polling updates for a todo card.
 * Updates time remaining and overdue indicator every 30 seconds.
 * Stops polling if the todo status is "Done".
 *
 * @param {HTMLElement} cardElement - The card element to update
 * @param {Object} todo - The todo data object
 * @returns {Function} - Cleanup function that clears the interval
 */
export function initTodoCardUpdates(cardElement, todo) {
  const timeRemainingEl = cardElement.querySelector('[data-testid="test-todo-time-remaining"]');
  const overdueIndicator = cardElement.querySelector('[data-testid="test-todo-overdue-indicator"]');

  // Check if already done - skip interval setup
  if (todo.status === 'Done' || todo.completed) {
    if (timeRemainingEl) {
      timeRemainingEl.textContent = 'Completed';
    }
    if (overdueIndicator) {
      overdueIndicator.hidden = true;
    }
    return () => {}; // Return empty cleanup function
  }

  let intervalId = null;

  function updateTimeDisplay() {
    // Check if status changed to Done
    const statusEl = cardElement.querySelector('[data-testid="test-todo-status"]');
    const statusText = statusEl?.textContent || todo.status;
    const isDone = statusText === 'Done' || todo.completed;

    if (isDone) {
      if (timeRemainingEl) {
        timeRemainingEl.textContent = 'Completed';
      }
      if (overdueIndicator) {
        overdueIndicator.hidden = true;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      return;
    }

    // Update time remaining
    if (timeRemainingEl && todo.dueDate) {
      const newTimeText = getTimeRemaining(todo.dueDate);
      timeRemainingEl.textContent = newTimeText;
    }

    // Update overdue indicator
    if (overdueIndicator && todo.dueDate) {
      overdueIndicator.hidden = !isOverdue(todo.dueDate);
    }
  }

  // Initial update
  updateTimeDisplay();

  // Set up 30-second interval
  intervalId = setInterval(updateTimeDisplay, 30000);

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}