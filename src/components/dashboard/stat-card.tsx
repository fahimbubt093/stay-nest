import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  iconStyle: string;
};

export function StatCard({ title, value, icon, iconStyle }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {value}
      </p>
    </article>
  );
}
