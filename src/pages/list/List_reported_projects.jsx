import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_reported_projects from "../../components/datatable/Datatable_reported_projects"

const List_reported_projects = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_reported_projects/>
      </div>
    </div>
  )
}

export default List_reported_projects