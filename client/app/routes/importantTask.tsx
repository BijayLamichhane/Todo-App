import Dashboard1 from '~/components/Dashboard1';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Important Task" },

    { name: "description", content: "Todo App - Important Task" },

  ];
}

const ImportantTask = () => {
  return (
    <div>
      <Dashboard1 />
    </div>
  )
}

export default ImportantTask