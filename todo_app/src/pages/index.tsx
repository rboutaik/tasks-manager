import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import TasksList from "./components/tasksList";
import ThemeToggle from "./components/themeToggle";


export default function Home() {
  return (
    <div className="relative h-screen w-full transition-all duration-300">
      <NavBar></NavBar>
      <SideBar></SideBar>
      <TasksList></TasksList>
    </div>
  );
}
