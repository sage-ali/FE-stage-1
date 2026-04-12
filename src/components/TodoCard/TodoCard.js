import { escapeHTML, makeSafeId } from '../../utils/html.js';

export function createTodoCard(todo) {
  const title = escapeHTML(todo.title);
  const description = escapeHTML(todo.description);
  const priority = escapeHTML(todo.priority);
  const status = escapeHTML(todo.status);
  const dueDateFormatted = escapeHTML(todo.dueDateFormatted);
  const timeRemaining = escapeHTML(todo.timeRemaining);
  const dueDateISO = escapeHTML(todo.dueDateISO);
  const safeId = makeSafeId(todo.id);

  return `
    <article data-testid="test-todo-card">
      <header>
        <h3 data-testid="test-todo-title">${title}</h3>
        <p data-testid="test-todo-description">${description}</p>
      </header>

      <div role="group" aria-label="Todo metadata">
        <dl>
          <div>
            <dt>Priority</dt>
            <dd data-testid="test-todo-priority">${priority}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd data-testid="test-todo-status">${status}</dd>
          </div>
          <div>
            <dt>Due Date</dt>
            <dd>
              <time data-testid="test-todo-due-date" datetime="${dueDateISO}">${dueDateFormatted}</time>
            </dd>
          </div>
          <div>
            <dt>Time Remaining</dt>
            <dd data-testid="test-todo-time-remaining">${timeRemaining}</dd>
          </div>
        </dl>
      </div>

      <section>
        <h4>Tags</h4>
        <ul data-testid="test-todo-tags" aria-label="Tags list">
          ${todo.tags.map((tag) => `<li>${escapeHTML(tag)}</li>`).join('')}
        </ul>
      </section>

      <footer>
        <label for="todo-complete-${safeId}">
          <input type="checkbox" id="todo-complete-${safeId}" data-testid="test-todo-complete-toggle" ${todo.completed ? 'checked' : ''}>
          Mark as complete
        </label>
        <button type="button" data-testid="test-todo-edit-button" aria-label="Edit ${title}">Edit</button>
        <button type="button" data-testid="test-todo-delete-button" aria-label="Delete ${title}">Delete</button>
      </footer>
    </article>
  `;
}
