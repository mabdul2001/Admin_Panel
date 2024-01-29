import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AddInterest = ({ inputs, title }) => {
  const [formData, setFormData] = useState({});
  const [userRows, setUserRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (inputId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));
  };

  const handleDelete = (id) => {
    setUserRows(userRows.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch('https://fyp-ubit-backend.onrender.com/api/v1/admin/getInterest', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the textfield is not empty before sending data to the API
    const isTextFieldNotEmpty = Object.values(formData).some((value) => value !== '');

    if (isTextFieldNotEmpty) {
      // Send data to the API
      console.log('Sending data to API:', formData);
      const token = window.localStorage.getItem("token");
      console.log(token);
      // You can make an API call here using fetch or any other library
      const response = await fetch(`https://fyp-ubit-backend.onrender.com/api/v1/admin/addInterest`, {
      method: 'PATCH', // or 'POST' depending on your API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify(formData)
      // Add any additional request parameters if required
    });
    console.log(response);
    alert(response.status == 200 ? "Interest Added" :"Something went wrong!")
    } else {
      console.log('Textfield is empty. Please fill it before submitting.');
    }
  };
  const columns = [
    
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    
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
  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 0,
  //     renderCell: (params) => {
        
        
  //       return (
  //         <div className="cellAction">
            
            
  //         </div>
  //       );
  //     },
  //   },


  // ];

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <div className="datatable">
      <div className="datatableTitle">
        Interests List

      </div>
      <DataGrid
        className="datagrid"
        rows={userRows}
        // columns={[...columns, ...actionColumn]}
        columns={[...columns]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
      </div>
    </div>
  );
};

export default AddInterest;
