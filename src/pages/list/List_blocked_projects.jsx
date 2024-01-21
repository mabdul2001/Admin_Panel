import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_blocked_projects from "../../components/datatable/Datatable_blocked_projects"

const List_blocked_projects = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_blocked_projects/>
      </div>
    </div>
  )
}

export default List_blocked_projects