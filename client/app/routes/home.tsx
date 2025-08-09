import { useState } from "react";
import type { Route } from "./+types/home";
import { tasks } from "~/constants";
import TasksCard from "~/components/TasksCard";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "Todo App - A simple todo app" },
  ];
}

export default function Home() { 

  return (
    <>
      <TasksCard />
    </>
  );
}
