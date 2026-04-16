# Active Context

## Current Work Focus

Refining the `TodoCard` component to meet 100% of the project requirements, specifically focusing on `data-testid` coverage, semantic HTML for time-remaining, and accurate date formatting.

## Recent Changes

- Initialized Memory Bank documentation.
- Refined `TodoCard` component and `time.js` utilities for 100% requirements compliance.
- Set up Vitest testing suite with >80% code coverage.

## Next Steps

- All core requirements and testing goals have been met.

## Active Decisions and Considerations

- **Date Formatting**: Decisions made to include "Due" prefix and simplify long-term dates to match brief examples exactly.
- **Tag testIDs**: Decide to use `makeSafeId` for tag names in `data-testid` to ensure valid attribute values.
- **Date Parsing**: Implemented `parseTargetDate` to treat "YYYY-MM-DD" strings as local time to avoid UTC off-by-one errors.
