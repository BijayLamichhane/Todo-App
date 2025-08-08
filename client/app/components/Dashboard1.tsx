import { Link, useLocation } from "react-router"
import { NavigationDashbord } from "~/constants"

const Dashboard1 = () => {
  const pathname = useLocation().pathname

  return (
    <div className="w-[325px] h-full flex flex-col">
      <h1 className="text-2xl text-black/70 font-bold p-15 pl-18 pb-10 ml-6">TO-DO LIST</h1>

      <button className="w-[280px] h-[60px] bg-primary-100 text-white rounded-xl mb-10 cursor-pointer hover:opacity-80 ml-6">Add New Task</button>
      <div className="flex flex-col items-start justify-start">

        {NavigationDashbord.map((item) => (
          <Link key={item.href} to={item.href} className={`w-full h-[55px] text-gray-500 font-semibold text-xl cursor-pointer hover:bg-red-200 items-center flex p-6 ${pathname === item.href ? 'bg-[#f0e3ff] text-secondary-100 border-r-6 border-secondary-10' : ''}`}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard1