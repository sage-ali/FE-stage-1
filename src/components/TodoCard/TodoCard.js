export function createTodoCard(todo) {
  return `
    <article data-testid="test-todo-card">
      <header>
        <h3 data-testid="test-todo-title">${todo.title}</h3>
        <p data-testid="test-todo-description">${todo.description}</p>
      </header>
      
      <div role="group" aria-label="Todo metadata">
        <dl>
          <div>
            <dt>Priority</dt>
            <dd data-testid="test-todo-priority">${todo.priority}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd data-testid="test-todo-status">${todo.status}</dd>
          </div>
          <div>
            <dt>Due Date</dt>
            <dd>
              <time data-testid="test-todo-due-date" datetime="${todo.dueDateISO}">${todo.dueDateFormatted}</time>
            </dd>
          </div>
          <div>
            <dt>Time Remaining</dt>
            <dd data-testid="test-todo-time-remaining">${todo.timeRemaining}</dd>
          </div>
        </dl>
      </div>

      <section>
        <h4>Tags</h4>
        <ul data-testid="test-todo-tags" aria-label="Tags list">
          ${todo.tags.map((tag) => `<li>${tag}</li>`).join('')}
        </ul>
      </section>

      <footer>
        <label>
          <input type="checkbox" data-testid="test-todo-complete-toggle" ${todo.completed ? 'checked' : ''}>
          Mark as complete
        </label>
        <button type="button" data-testid="test-todo-edit-button">Edit</button>
        <button type="button" data-testid="test-todo-delete-button">Delete</button>
      </footer>
    </article>
  `;
}
