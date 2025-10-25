import { ReactNode } from "react";
import { useMissionStore } from "../lib/store";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export const Layout = ({ children, sidebar }: LayoutProps) => {
  const theme = useMissionStore((state) => state.settings.theme);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        theme === "light"
          ? "bg-background-light text-slate-200"
          : "bg-background text-slate-100"
      }`}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6 p-6">
        <aside className="space-y-6" aria-label="Sidebar">
          {sidebar}
        </aside>
        <main className="space-y-6" aria-label="Main content">
          {children}
        </main>
      </div>
    </div>
  );
};
