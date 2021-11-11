import React, { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import { DataGrid } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"

const UsersList = () => {
  const { getUsers } = useContext(FirebaseContext)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [removeUser, setRemoveUser] = useState("")

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "Email",
      headerName: "Email",
      width: 200,
      editable: false,
    },
    {
      field: "Validade",
      headerName: "Validade",
      width: 115,
      editable: false,
    },
    {
      field: "Cursos",
      headerName: "Cursos",
      width: 80,
      editable: false,
      sortable: false,
      disableColumnFilter: true,
      renderCell: params => (
        <Typography sx={{ p: 2 }} style={{ cursor: "pointer" }}>
          {params.formattedValue.length}
        </Typography>
      ),
    },
    {
      field: "editar",
      headerName: "",
      description: "Edit buttons",
      sortable: false,
      width: 35,
      disableColumnFilter: true,
      renderCell: params => (
        <Link
          to={`/admin/editUser/${params.formattedValue}`}
          style={{ cursor: "pointer", color: "#0066cc" }}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      field: "remover",
      headerName: "",
      description: "Remove buttons",
      sortable: false,
      width: 35,
      disableColumnFilter: true,
      renderCell: params => (
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#0066cc",
            cursor: "pointer",
          }}
          onClick={() => {
            setRemoveUser("flag")
          }}
        >
          <DeleteForeverIcon />
        </button>
      ),
    },
  ]

  useEffect(() => {
    getUsers().then(users => {
      setRows(
        users.map(user => ({
          id: user.userRef || user.id,
          Email: user.email,
          Validade: new Date(user.validade.seconds).toLocaleString(),
          editar: user.id,
          remover: user.id,
          Cursos: user.cursos,
        }))
      )
      setLoading(false)
    })
  }, [getUsers])

  return (
    <div
      style={{
        height: "80vh",
        maxHeight: "700px",
        width: "670px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={loading}
      />
    </div>
  )
}

export default UsersList
