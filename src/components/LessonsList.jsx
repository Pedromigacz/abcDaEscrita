import React, { useState, useEffect, useContext, useCallback } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import { DeleteLesson } from "./"
import { Link } from "gatsby"

// mui imports
import { DataGrid } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const LessonsList = () => {
  const { getLessons } = useContext(FirebaseContext)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteItem, setDeleteItem] = useState(null)

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "curso",
      headerName: "Curso",
      width: 100,
      editable: false,
    },
    {
      field: "titulo",
      headerName: "Titulo",
      width: 350,
      editable: false,
    },
    {
      field: "data",
      headerName: "Data",
      width: 115,
      editable: false,
    },
    {
      field: "conteudo",
      headerName: "Conteudo",
      width: 150,
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
          to={`/admin/editLesson/${params.formattedValue.id}`}
          style={{
            cursor: "pointer",
            color: "#0066cc",
            display: "grid",
            "place-items": "center",
          }}
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
            color: "#f44336",
            cursor: "pointer",
            display: "grid",
            "place-items": "center",
          }}
          onClick={() => {
            setDeleteItem(params.formattedValue)
          }}
        >
          <DeleteForeverIcon />
        </button>
      ),
    },
  ]

  const fetchData = useCallback(() => {
    getLessons().then(lessons => {
      setRows(prev => {
        return lessons.map(lesson => {
          return {
            id: lesson.data.seconds + lesson.id,
            titulo: lesson.titulo || "Sem informa????o",
            data:
              (lesson.data &&
                new Date(lesson.data.seconds * 1000).toLocaleString()) ||
              "Sem informa????o",
            curso: lesson.curso.split("/")[2],
            conteudo: lesson.conteudo || "Sem informa????o",
            editar: lesson,
            remover: { titulo: lesson.titulo, id: lesson.id },
          }
        })
      })
      setLoading(false)
    })
  }, [getLessons])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div
      style={{
        height: "80vh",
        maxHeight: "700px",
        width: "925px",
      }}
    >
      <DeleteLesson
        lesson={deleteItem}
        handleClose={() => {
          setDeleteItem(null)
        }}
        fetchData={fetchData}
      />
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

export default LessonsList
