import Dashboard1 from '~/components/Dashboard1';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Completed Task" },

    { name: "description", content: "Todo App - Completed Task" },

  ];
}

const CompletedTask = () => {
  return (
    <>
      
    </>
  )
}

export default CompletedTask