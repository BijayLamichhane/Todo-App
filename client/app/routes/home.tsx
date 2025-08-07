import Dashboard1 from "~/components/Dashboard1";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Todo App - A simple todo app" },
  ];
}

export default function Home() {
  return <>
    
  </>;
}
