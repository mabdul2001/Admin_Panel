import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_blocked_users from "../../components/datatable/Datatable_blocked_users"

const List_blocked_users = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_blocked_users/>
      </div>
    </div>
  )
}

export default List_blocked_users