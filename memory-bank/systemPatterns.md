# System Patterns

## Architecture

The project follows a modular component-based architecture using vanilla JavaScript.

- **Components**: UI elements are encapsulated in their own directories (e.g., `src/components/TodoCard/`) containing logic (`.js`) and styles (`.css`).
- **Utilities**: Shared logic is extracted into utility files (`src/utils/`).
- **Data Flow**: One-way data flow where data is passed to component factory functions which return HTML strings for injection into the DOM.

## Key Technical Decisions

- **Vanilla JS Templates**: Using template literals for HTML generation to maintain simplicity and performance without a heavy framework.
- **BEM Naming Convention**: CSS classes follow Block-Element-Modifier for maintainability.
- **Semantic HTML**: Prioritizing native elements (article, h3, time, label, input) for accessibility.
- **Dynamic Updates**: Using `setInterval` in the entry point to update time-sensitive UI elements.

## Component Relationships

- `main.js` (Entry) -> `TodoCard.js` (Component)
- `TodoCard.js` -> `html.js` (Utility)
- `main.js` -> `time.js` (Utility)
