import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import TasksList from "./components/tasksList";


export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      {/* <SideBar></SideBar> */}
      <TasksList></TasksList>
    </>
  );
}
