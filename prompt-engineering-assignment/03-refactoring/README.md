# Module 3 – Refactoring

## Objective

Improve the structure and readability of the employee list component while preserving its existing behavior.

## Target file

- [`EmployeeList.messy.tsx`](EmployeeList.messy.tsx)

## Prompt sequence

### Initial prompt

> Refactor `prompt-engineering-assignment/03-refactoring/EmployeeList.messy.tsx` while preserving its existing behavior and Redux integration. Do not add features or change the visual design. Preserve loading, empty, edit, and delete behavior, and handle loading, empty-state, and confirmation-before-delete edge cases. Explain the intended refactoring before editing, then provide the updated file.

### Follow-up prompt

> Compare the refactored component with the requirements. Check that employees still load, loading and empty states are represented, editing opens the correct employee, and deletion still requires confirmation. Fix any lost behavior.

### Verification prompt

> Review the diff and run the narrowest available validation for this component. Report what you checked and whether the existing behavior is preserved.

## Constraints

- Do not add features or change the visual design.
- Preserve Redux integration and existing loading, empty, edit, and delete behavior.
- Handle loading, empty-state, and confirmation-before-delete edge cases.
- Keep the work limited to the standalone exercise copy unless a check requires otherwise.

## Deliverables

- A refactored standalone copy of the target file.
- The ordered prompts used, including follow-ups.
- A concise explanation of the refactoring.
- A 2–4 sentence note describing what you verified and why you accepted or rejected the result.
