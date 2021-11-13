import React, { useState, useEffect, useContext, useCallback } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
// import { DeletationModal } from "./"
import { Link } from "gatsby"

// mui imports
import { DataGrid } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"

const CoursesList = () => {
  const { getCourses } = useContext(FirebaseContext)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteItem, setDeleteItem] = useState(null)

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "Titulo",
      headerName: "Titulo",
      width: 350,
      editable: false,
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
          to={`/admin/editCourse/${
            params.formattedValue.id
          }?title=${encodeURIComponent(params.formattedValue.titulo)}`}
          style={{ cursor: "pointer", color: "#0066cc" }}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      field: "Adicionar aula",
      headerName: "",
      description: "Adicionar Aula",
      sortable: false,
      width: 35,
      disableColumnFilter: true,
      renderCell: params => (
        <Link
          to={`/admin/addLesson/${
            params.formattedValue.id
          }?title=${encodeURIComponent(params.formattedValue.titulo)}`}
          style={{ cursor: "pointer", color: "#0066cc" }}
        >
          <CreateNewFolderIcon />
        </Link>
      ),
    },
    // {
    //   field: "remover",
    //   headerName: "",
    //   description: "Remove buttons",
    //   sortable: false,
    //   width: 35,
    //   disableColumnFilter: true,
    //   renderCell: params => (
    //     <button
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: "#f44336",
    //         cursor: "pointer",
    //       }}
    //       onClick={() => {
    //         setDeleteItem(params.formattedValue)
    //       }}
    //     >
    //       <DeleteForeverIcon />
    //     </button>
    //   ),
    // },
  ]

  const fetchData = useCallback(() => {
    getCourses().then(courses => {
      setRows(prev => {
        console.log(courses)
        return courses.map(course => ({
          id: course.id,
          Titulo: course.titulo,
          editar: course,
          "Adicionar aula": course,
        }))
      })
      setLoading(false)
    })
  }, [getCourses])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div
      style={{
        height: "80vh",
        maxHeight: "700px",
        width: "670px",
      }}
    >
      {/* <DeletationModal
        user={deleteItem}
        handleClose={() => {
          setDeleteItem(null)
        }}
        fetchData={fetchData}
      /> */}
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

export default CoursesList
