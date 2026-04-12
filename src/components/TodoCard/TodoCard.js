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
            <dd class="todo-card__priority" data-priority="${priorityLower}" data-testid="test-todo-priority">${priority}</dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Status</dt>
            <dd data-testid="test-todo-status">${status}</dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Due Date</dt>
            <dd>
              <time data-testid="test-todo-due-date" datetime="${dueDateISO}">${dueDateFormatted}</time>
            </dd>
          </div>
          <div class="todo-card__meta-item">
            <dt>Time Remaining</dt>
            <div class="todo-card__meta-item">
              <dt>Time Remaining</dt>
              <dd>
                <time data-testid="test-todo-time-remaining" datetime="${dueDateISO}">${timeRemaining}</time>
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <section class="todo-card__tags-section">
        <h4>Tags</h4>
        <ul class="todo-card__tags tag-list" data-testid="test-todo-tags" aria-label="Tags list">
          ${(Array.isArray(todo.tags) ? todo.tags : [])
            .map(
              (tag) =>
                `<li class="todo-card__tag" data-testid="test-todo-tag-${makeSafeId(tag)}">${escapeHTML(tag)}</li>`
            )
            .join('')}
        </ul>
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
