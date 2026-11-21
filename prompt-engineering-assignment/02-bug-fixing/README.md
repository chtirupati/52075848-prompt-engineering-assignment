# Module 2 – Bug Fixing

## Objective

Use an AI assistant to identify the root causes of bugs in a standalone API module, explain the fixes, apply them, and verify the result.

## Target file

- [`employeeApi.buggy.ts`](employeeApi.buggy.ts)

## Prompt sequence

### Initial prompt

> Inspect `prompt-engineering-assignment/02-bug-fixing/employeeApi.buggy.ts` and compare it with the intended employee API operations: fetching, creating, updating, and deleting employees. Identify each bug's root cause and explain the symptom it could cause before editing. Then apply the smallest fixes that preserve the existing API.

### Follow-up prompt

> Review the diff for regressions. Confirm create and update send the expected headers and body, failed responses are handled consistently, and delete does not report success when its request fails. Correct any gaps.

### Verification prompt

> Run the narrowest available check for this file, then run the project build if available. Report the commands and results. Do not change unrelated files.

## Deliverables

- The ordered prompts used, including follow-ups.
- The fixed standalone file or a clear diff.
- A concise description of each bug's root cause and fix.
- A 2–4 sentence note describing what you verified and why you accepted or rejected the result.

## Constraints

- Work on the standalone exercise file, not the live API module.
- Explain root causes before changing code.
- Preserve the existing exported API and avoid unrelated changes.
- Report checks honestly; do not claim a build or test passed unless it was run.
