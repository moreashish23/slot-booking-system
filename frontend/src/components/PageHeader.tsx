import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-ink-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-signal-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold text-ink-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-ink-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
