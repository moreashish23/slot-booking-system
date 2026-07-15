import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink-800">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`rounded-lg border px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-500 ${
            error
              ? "border-danger-400 bg-danger-400/5"
              : "border-ink-200 bg-white focus:border-ink-400"
          } ${className}`}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-danger-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
