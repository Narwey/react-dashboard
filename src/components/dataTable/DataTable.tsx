
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './dataTable.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Edit from '../edit/Edit';

type Props = {
  columns: GridColDef[];
  rows: object[];
  handleDelete: (id:string)=> any ;
  slug: string;
};

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

const DataTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  
  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <button  onClick={() => setOpen(true)}> <img src="/view.svg" alt="" /></button>
          <div className="delete" onClick={() => props.handleDelete(params.row._id)}>
            <img src="/delete.svg" alt="" />
          </div>
          {open && <Edit slug="user" columns={columns} setOpen={setOpen} />}
        </div>
        
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid getRowId={(row) => row._id} pageSizeOptions={[5, 10, 25]}
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;