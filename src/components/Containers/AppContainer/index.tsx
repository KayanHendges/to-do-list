import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ComponentProps } from "react";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function AppContainer({ className, children, ...props }: Props) {
  const { pathname } = useLocation();

  const isPublicRoute = pathname.includes("login");

  return (
    <div
      className={twMerge(
        "w-screen h-screen flex flex-col bg-zinc-100 overflow-hidden",
        className
      )}
      {...props}
    >
      {!isPublicRoute && <Header />}
      <div style={{}} className="flex-1 max-h-full flex">
        <main className="flex-1 max-w-full h-full overflow-hidden">
          {children}
        </main>
        {!isPublicRoute && <Sidebar />}
      </div>
    </div>
  );
}
