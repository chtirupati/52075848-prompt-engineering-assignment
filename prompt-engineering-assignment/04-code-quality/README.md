# Module 4 – Code Quality

## Objective

Review and improve the employee Redux slice's type safety, loading state, and error handling without changing its current behavior.

## Target file

- [`employeesSlice.quality.ts`](employeesSlice.quality.ts)

## Prompt sequence

### Initial prompt

> Review `prompt-engineering-assignment/04-code-quality/employeesSlice.quality.ts` for type safety and error-handling quality. Keep current Redux behavior intact. Identify specific issues and explain why each proposed change is needed before editing. Then improve loading and error handling and provide a concise change list.

### Follow-up prompt

> Check the pending, fulfilled, and rejected paths for every thunk. Verify loading state cannot get stuck, failures are surfaced consistently, and successful create, update, and delete operations still update the employee list correctly. Correct any gaps.

### Verification prompt

> Review the diff and run the narrowest available type check or build. Report the result and any remaining limitations.

## Quality requirements

- Explain why each change is needed before applying it.
- Keep current Redux behavior intact.
- Add or improve loading and error handling for the async operations.
- Keep changes focused on the standalone exercise copy.

## Deliverables

- A standalone copy of the reviewed slice.
- The ordered prompts used, including follow-ups.
- A concise change list.
- A 2–4 sentence note describing what you verified and why you accepted or rejected the result.
