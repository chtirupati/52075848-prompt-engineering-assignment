// Standalone copy of EmployeeForm for code review.
// Review this file without editing it.

import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "../../src/store/hooks";
import {
  createEmployeeThunk,
  updateEmployeeThunk,
} from "../../src/store/employeeSlice";
import type { Employee, EmployeeInput } from "../../src/types/employee";

interface EmployeeFormProps {
  initialValue?: Employee;
  onClose: () => void;
}

const EMPTY_FORM: EmployeeInput = {
  name: "",
  email: "",
  department: "",
  position: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmployeeForm({
  initialValue,
  onClose,
}: EmployeeFormProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<EmployeeInput>(
    initialValue
      ? {
          name: initialValue.name,
          email: initialValue.email,
          department: initialValue.department,
          position: initialValue.position,
        }
      : EMPTY_FORM,
  );
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof EmployeeInput, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (initialValue) {
        await dispatch(
          updateEmployeeThunk({ id: initialValue.id, data: form }),
        ).unwrap();
      } else {
        await dispatch(createEmployeeThunk(form)).unwrap();
      }
      onClose();
    } catch {
      setFormError("Failed to save employee. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && <p role="alert">{formError}</p>}
      {(["name", "email", "department", "position"] as const).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            id={key}
            type={key === "email" ? "email" : "text"}
            value={form[key]}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, [key]: event.target.value }))
            }
            aria-invalid={Boolean(fieldErrors[key])}
          />
          {fieldErrors[key] && <p>{fieldErrors[key]}</p>}
        </div>
      ))}
      <button type="submit" disabled={submitting}>
        Save
      </button>
    </form>
  );
}
