import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Login from "../../pages/login/Login";
import TokenContext from "../../pages/login/TokenContext";

const Datatable_blocked_users = () => {
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
        const response = await fetch('https://fyp-ubit-backend.onrender.com/api/v1/admin/getBlockedUsers', {
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
        console.log((result.data), "Data");
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



const handleBlock = async (userId,status) => {
  try {
    // Call your API to block the user
    console.log(userId);
    const token = window.localStorage.getItem("token");
    const response = await fetch(`https://fyp-ubit-backend.onrender.com/api/v1/admin/updateUserStatus?userId=${userId}&status=${status}`, {
      method: 'PATCH', // or 'POST' depending on your API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      // Add any additional request parameters if required
    });

    if (!response.ok) {
      throw new Error('Failed to block user');
    }

    // Update the local state or trigger a re-fetch if necessary
    // For example:
    const updatedUserData = await response.json();

    // Update the local state (userRows) with the updated user data
    setUserRows((prevUserRows) => {
      const updatedUserRows = prevUserRows.map((user) => {
        if (user._id === userId) {
          return updatedUserData.data; // Assuming the updated data is available in response.data
        }
        return user;
      });

      return updatedUserRows;
    });
  } catch (error) {
    console.error('Error blocking user:', error);
  }
};


  const columns = [
    {
      field: "photo",
      headerName: "Pic",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.value ? ("https://fyp-ubit-backend.onrender.com/api/images/" + params.value) : ''}
          alt="Image"
          style={{ width: '100%', height: 'auto' }}
        />
      ),
    },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role", headerName: "Role", width: 200,
      renderCell: (params) => (
        <div>{params.value.toUpperCase()}</div>
      )
    },
    {
      field: "interests", headerName: "Interests", width: 200,
      renderCell: (params) => (
        <div>
          {params.value.some((element) => element['value'] === 1) ? (
            params.value.map((element, index) => (
              element['value'] === 1 ? (
                <div key={index}>{element['name'].toUpperCase()},</div>
              ) : null
            ))
          ) : (
            <div>-</div>
          )}
        </div>
      )
    },

    {
      field: "isActive", headerName: "Active Status", width: 200,
      renderCell: (params) => (
        <div>{params.value ? "ACTIVE" : "INACTIVE"}</div>
      )
    },
    {
      field: "isBlockedByAdmin", headerName: "Admin Blocked Status", width: 200,
      renderCell: (params) => (
        <div>{params.value ? "BLOCKED" : "NOT BLOCKED"}</div>
      )
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
        const isBlockedByAdmin = params.row.isBlockedByAdmin;
    
        const handleAction = () => {
          const userId = params.row._id;
          if (isBlockedByAdmin) {
            // Call API to unblock user
            handleBlock(userId, "false");
          } else {
            // Call API to block user
            handleBlock(userId, "true");
          }
        };
    
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={handleAction}
            >
              {isBlockedByAdmin ? 'Unblock' : 'Block'}
            </div>
          </div>
        );
      },
    },
    
    
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Blocked Users List

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

export default Datatable_blocked_users;
