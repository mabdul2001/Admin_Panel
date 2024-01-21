import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_reported_users from "../../components/datatable/Datatable_reported_users"

const List_reported_users = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_reported_users/>
      </div>
    </div>
  )
}

export default List_reported_users