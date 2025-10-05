import EmployeeList from "./components/EmployeeList";
import ThemeToggle from "./components/ThemeToggle";


function App() {



  return (
    <>
    <div className="min-h-screen text-black bg-white dark:text-white dark:bg-gray-900">
      <header className="p-4 flex justify-between">
        <h1 className="text-2xl">Employee Dashboard</h1>
        <ThemeToggle></ThemeToggle>
      </header>
      <EmployeeList></EmployeeList>
    </div>
    </>
  )
}

export default App
