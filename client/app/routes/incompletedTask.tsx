import Dashboard1 from '~/components/Dashboard1';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Incompleted Task" },

    { name: "description", content: "Todo App - Incompleted Task" },

  ];
}

const IncompletedTask = () => {
  return (
    <div>
      <Dashboard1 />
    </div>
  )
}

export default IncompletedTask