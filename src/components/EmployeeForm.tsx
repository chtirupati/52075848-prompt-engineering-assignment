import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  createEmployeeThunk,
  updateEmployeeThunk,
} from "../store/employeeSlice";
import type { Employee, EmployeeInput } from "../types/employee";

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

const FIELDS: {
  key: keyof EmployeeInput;
  label: string;
  type: string;
}[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "department", label: "Department", type: "text" },
  { key: "position", label: "Position", type: "text" },
];

function validate(
  values: EmployeeInput,
): Partial<Record<keyof EmployeeInput, string>> {
  const errors: Partial<Record<keyof EmployeeInput, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.department.trim()) {
    errors.department = "Department is required";
  }

  if (!values.position.trim()) {
    errors.position = "Position is required";
  }

  return errors;
}

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

  function handleChange(field: keyof EmployeeInput, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const errors = validate(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setFormError(null);
    setSubmitting(true);

    try {
      if (initialValue) {
        await dispatch(
          updateEmployeeThunk({
            id: initialValue.id,
            data: form,
          }),
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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && (
        <p className="rounded-md bg-red-50 p-2 text-sm text-red-600">
          {formError}
        </p>
      )}
      {FIELDS.map(({ key, label, type }) => (
        <div key={key}>
          <label
            htmlFor={key}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>

          <input
            id={key}
            type={type}
            value={form[key]}
            onChange={(event) => handleChange(key, event.target.value)}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
        focus:border-indigo-500 focus:outline-none focus:ring-1
      `}
          />

          {fieldErrors[key] && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors[key]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {initialValue ? "Save Changes" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
