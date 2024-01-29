import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable_reported_projects = () => {
  const [userRows, setUserRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch('https://fyp-ubit-backend.onrender.com/api/v1/admin/getReportedProjects', {
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
        console.log(result.data);
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
  
  const columns = [
    { field: "applicantId", headerName: "Applicant", width: 200,
  renderCell: (params) => (
    <div>{params.value?.fullName}</div>
  ) },
    { field: "reportedProjectId", headerName: "Reported Project", width: 200,
  renderCell: (params) => (
    <div>{params.value?.projectName}</div>
  ) },
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
        Reported Projects List

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

export default Datatable_reported_projects;
