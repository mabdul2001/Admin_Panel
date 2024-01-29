import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Login from "../../pages/login/Login";
import TokenContext from "../../pages/login/TokenContext";

const Datatable_reported_users = () => {
  const [userRows, setUserRows] = useState([]);
  const token = useContext(TokenContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (!token) {
        //   throw new Error('Token not available');
        // }
        setLoading(true);
        const token = window.localStorage.getItem("token");
        const response = await fetch('https://fyp-ubit-backend.onrender.com/api/v1/admin/getReportedUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log((result.data));
        setUserRows(result.data); // Update the state with the received data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  const handleDelete = (id) => {
    setUserRows(userRows.filter((item) => item._id !== id));
  };
  // Assuming you have some state and functions to manage the users in your component
  // const [users, setUsers] = useState([...]);



  const columns = [
    {
      field: "applicantId", headerName: "Applicant", width: 200,
      renderCell: (params) => (
        <div>{params.value?.fullName ?? ""}</div>
      )
    },
    {
      field: "reportedUserId", headerName: "Reported User", width: 200,
      renderCell: (params) => (
        <div>{params.value?.fullName ?? ""}</div>
      )
    },
    { field: "message", headerName: "Message", width: 250 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
    },

  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <div

            >

            </div>
          </div>
        );
      },
    },


  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Reported Users List

      </div>
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={[...columns, ...actionColumn]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable_reported_users;
