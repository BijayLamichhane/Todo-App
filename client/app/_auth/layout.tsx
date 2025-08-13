import React from "react";
import { Outlet } from "react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div><Outlet /></div>;
}
