# Technical Context

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tools**: None (Native ES modules used)
- **Formatting**: Prettier, ESLint
- **Testing**: Automated tests via `data-testid` attributes (implied)

## Development Setup

- Local development via standard web server.
- CSS Custom Properties used for theming and consistency.

## Technical Constraints

- No external frameworks allowed (strictly vanilla JS).
- Specific `data-testid` mapping must be preserved for automated validation.
- Updates must occur every 30-60 seconds.

## Dependencies

- No runtime dependencies.
- Development dependencies: ESLint, Prettier (as seen in `package.json`).
