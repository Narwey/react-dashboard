import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import "../../components/add/add.scss"
import React , { useState , useEffect } from "react";
import Add from "../../components/add/Add";
// import { userRows } from "../../data";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "role",
    type: "string",
    headerName: "Role",
    width: 200,
  },
  {
    field: "creationDate",
    headerName: "creationDate",
    width: 200,
    type: "string",
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    type: "string",
  },
  // {
  //   field: "password",
  //   headerName: "password",
  //   width: 200,
  //   type: "string",
  //   hideable: true ,
  // },
  {
    field: "active",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  
  const addUser = (user:any) => {
    setUserData([...userData , user])
  }
  

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/v1/users/${id}`, {
        method: 'DELETE',
      });
      setUserData(userData.filter((user)=>{
        return user._id !== id ;
      }))
      

      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }

      // After successful deletion, you may want to update the state with the new data
      // Update the 'rows' state or refetch data if needed
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle error
    }
  };

  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/v1/users");
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json(); 
          setUserData(data.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
          // Handle error if fetching fails
        }
      };

      fetchData();
    }, []);
  

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>

      {!isLoading ? (
        <React.Fragment>
          <DataTable slug="users" columns={columns} rows={userData} handleDelete={handleDelete} />
          {open && <Add slug="user" columns={columns} setOpen={setOpen} addUser={addUser} />}
        </React.Fragment>
      ) : (
        // Display a loading message while fetching data
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Users;
