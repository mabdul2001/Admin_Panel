import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_projects from "../../components/datatable/Datatable_projects"

const List_projects = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_projects/>
      </div>
    </div>
  )
}

export default List_projects