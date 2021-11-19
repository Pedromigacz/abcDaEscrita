import React, { useState, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"

// mui imports
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

const AddCourseForm = () => {
  const [title, setTitle] = useState("")
  const { addCourse } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    await addCourse(title)
    setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Formulário de criação de curso
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <TextField
              required
              fullWidth
              id="titulo"
              label="Titulo"
              name="titulo"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <LoadingButton
              loadingPosition="start"
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar curso
            </LoadingButton>
          </Box>
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

export default AddCourseForm
