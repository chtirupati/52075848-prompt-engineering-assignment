# Module 5 – Feature Addition

## Objective

Add client-side employee search to the live app, filtering the displayed rows by employee name or department.

## Target file

- [`src/components/EmployeeList.tsx`](../../src/components/EmployeeList.tsx)

## Feature request

Add a search box above the employee table. It should filter employees by name or department.

## Prompt sequence

### Initial prompt

> Add a search box above the employee table in `src/components/EmployeeList.tsx`. It should filter employees by name or department without changing existing CRUD behavior. Keep filtering state local to the component unless the existing architecture gives a concrete reason not to. Before editing, explain where the state belongs and how filtering will interact with the current employee list. Include an appropriate empty state when there are no matches.

### Follow-up prompt

> Review the implementation against the existing component and visual conventions. Check that search is case-insensitive, matches either name or department, handles whitespace-only input, and does not interfere with edit or delete actions. Fix any missing cases.

### Verification prompt

> Review the diff and run the project build. Report the command and result, and note what you manually checked.

## Acceptance criteria

- Existing create, read, update, and delete behavior remains intact.
- Search is case-insensitive and matches employee name or department.
- Whitespace-only search behaves like an empty query.
- Filtering state remains local to `EmployeeList` unless the existing architecture provides a concrete reason otherwise.
- An appropriate empty state appears when there are no matching employees.
- Run the project build after implementation and report its result.

## Deliverables

- The ordered prompts used, including follow-ups.
- The implementation diff or a summary of the changes.
- A 2–4 sentence note describing what you verified and why you accepted or rejected the result.

## Constraints

- This task changes the live app's `src/components/EmployeeList.tsx`; do not treat `EmployeeList.feature.tsx` in this folder as the implementation target. It is a reference copy.
- Preserve the existing visual design and CRUD workflows.
- Do not move filtering state into Redux without a specific architectural justification.
