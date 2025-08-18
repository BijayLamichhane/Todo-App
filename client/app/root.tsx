import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Dashboard1 from "./components/Dashboard1";
import Dashboard2 from "./components/Dashboard2";
import Navbar from "./components/Navbar";
import { DarkModeProvider } from "./lib/darkModeContext";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen flex flex-col">
        <DarkModeProvider>
        <AppProvider>
          {/* Mobile-first responsive layout */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Dashboard1 - Hidden on mobile, sidebar on desktop */}
            <div className="hidden lg:block lg:w-[325px] lg:flex-shrink-0">
              <Dashboard1 />
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <main className="h-full">
                  <div className="mx-auto max-w-7xl p-3 sm:p-4 lg:p-6">
                    <Navbar />
                    {children}
                  </div>
                </main>
                <Toaster />
              </div>
              
              {/* Dashboard2 - Bottom on mobile, right sidebar on desktop */}
              <div className="lg:w-[325px] lg:flex-shrink-0 order-first lg:order-last">
                <Dashboard2 />
              </div>
            </div>
          </div>
        </AppProvider>
        </DarkModeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
