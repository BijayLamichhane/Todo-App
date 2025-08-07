import Dashboard1 from '~/components/Dashboard1';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App | Today Task" },

    { name: "description", content: "Todo App - Today Task" },

  ];
}

const TodayTask = () => {
  return (
    <>
      
    </>
  )
}

export default TodayTask