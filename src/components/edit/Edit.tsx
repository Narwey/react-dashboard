import { GridColDef } from "@mui/x-data-grid";
import "./edit.scss";
import { useState } from "react"; 
import axios from "axios";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addUser: (user:any)=> any;
  
};



const Edit = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
       for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      };

      const response = await axios.post('http://localhost:4000/v1/users', formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      
      if (!response) {
        throw new Error("Failed to add item");
      }
      props.addUser(response.data);
      console.log("Item added successfully:", response.data);

      props.setOpen(false);
      // Handle query invalidation or any other actions upon success
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error or display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit">
      <div className="modal">
      <span className="close" onClick={() => props.setOpen(false)}>
          X
      </span>
        <h1>Edit new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "creationDate" && item.field !== "active")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} name={column.field} placeholder={column.field} />
              </div>
            ))} <div className="item">
                  <label>password</label>
                  <input  type="password" name="password" placeholder="enter your password"/> 
                </div> 
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
