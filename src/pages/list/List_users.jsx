import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable_users from "../../components/datatable/Datatable_users"

const List_users = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable_users/>
      </div>
    </div>
  )
}

export default List_users