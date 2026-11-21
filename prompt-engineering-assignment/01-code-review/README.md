# Module 1 – Code Review

## Objective

Review a standalone employee form and identify accessibility, correctness, and maintainability issues. This is a review-only task: do not edit the target file.

## Target file

- [`EmployeeForm.review.tsx`](EmployeeForm.review.tsx)

## Prompt sequence

### Initial prompt

> Review `prompt-engineering-assignment/01-code-review/EmployeeForm.review.tsx`. It is a standalone copy of the employee form, intended to create or update an employee and close after a successful save. Do not edit the file. Identify accessibility, form correctness, and maintainability issues. For each issue, cite the relevant code and explain its impact. Finish with the three highest-priority issues, ordered by severity.

### Follow-up prompt

> Re-check your findings against the actual code. Separate definite defects from recommendations. Verify whether validation is implemented and whether field errors are associated with their inputs. Revise the prioritized list if needed.

## Deliverables

- The ordered prompts used, including follow-ups.
- The AI's review with evidence for each finding.
- A 2–4 sentence note describing what you verified and why you accepted or rejected the findings.

## Review constraints

- Do not modify `EmployeeForm.review.tsx`.
- Findings should be grounded in the code, not general React advice.
- Distinguish confirmed defects from optional improvements.
- Prioritize the three most important issues.
