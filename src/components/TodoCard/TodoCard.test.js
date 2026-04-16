import { describe, it, expect } from 'vitest';
import { createTodoCard } from './TodoCard.js';

describe('TodoCard component', () => {
  const mockTodo = {
    id: 'test-1',
    title: 'Test Title',
    description: 'Test Description',
    priority: 'High',
    status: 'Pending',
    dueDateISO: '2026-04-12T12:00:00Z',
    dueDateFormatted: 'Due Apr 12, 2026',
    timeRemaining: 'Due in 2 hours',
    tags: ['urgent', 'work'],
    completed: false,
  };

  it('should render the correct data-testid attributes', () => {
    const html = createTodoCard(mockTodo);
    const container = document.createElement('div');
    container.innerHTML = html;

    expect(
      container.querySelector('[data-testid="test-todo-card"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-title"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-description"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-priority"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-due-date"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-time-remaining"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-status"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-complete-toggle"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-tags"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-edit-button"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-delete-button"]')
    ).not.toBeNull();

    // Check tags
    expect(
      container.querySelector('[data-testid="test-todo-tag-urgent"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-testid="test-todo-tag-work"]')
    ).not.toBeNull();
  });

  it('should display the correct content', () => {
    const html = createTodoCard(mockTodo);
    const container = document.createElement('div');
    container.innerHTML = html;

    expect(
      container.querySelector('[data-testid="test-todo-title"]').textContent
    ).toContain('Test Title');
    expect(
      container.querySelector('[data-testid="test-todo-description"]')
        .textContent
    ).toBe('Test Description');
    expect(
      container.querySelector('[data-testid="test-todo-priority"]').textContent
    ).toBe('High');
    expect(
      container.querySelector('[data-testid="test-todo-due-date"]').textContent
    ).toBe('Due Apr 12, 2026');
    expect(
      container.querySelector('[data-testid="test-todo-time-remaining"]')
        .textContent
    ).toBe('Due in 2 hours');
  });

  it('should reflect completed state', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const html = createTodoCard(completedTodo);
    const container = document.createElement('div');
    container.innerHTML = html;

    const card = container.querySelector('[data-testid="test-todo-card"]');
    expect(card.classList.contains('is-done')).toBe(true);

    const checkbox = container.querySelector(
      '[data-testid="test-todo-complete-toggle"]'
    );
    expect(checkbox.checked).toBe(true);

    const title = container.querySelector('[data-testid="test-todo-title"]');
    expect(title.innerHTML).toContain('Completed:');
  });

  it('should use semantic HTML elements', () => {
    const html = createTodoCard(mockTodo);
    const container = document.createElement('div');
    container.innerHTML = html;

    expect(container.querySelector('article')).not.toBeNull();
    expect(container.querySelector('h3')).not.toBeNull();
    expect(
      container.querySelector('time[data-testid="test-todo-due-date"]')
    ).not.toBeNull();
    expect(
      container.querySelector('time[data-testid="test-todo-time-remaining"]')
    ).not.toBeNull();
    expect(
      container.querySelector('ul[data-testid="test-todo-tags"]')
    ).not.toBeNull();
    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
    expect(container.querySelectorAll('button').length).toBe(2);
  });
});
