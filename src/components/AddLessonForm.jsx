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
import { styled } from "@mui/material/styles"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import Button from "@mui/material/Button"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import Grid from "@mui/material/Grid"

const Input = styled("input")({
  display: "none",
})

const AddLesson = ({ titulo, courseId }) => {
  const [form, setForm] = useState({ titulo: "", date: new Date() })
  const [file, setFile] = useState()
  const { addLesson } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    await addLesson(form, file, courseId)
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
            Adicionar aula ao curso{" "}
            <Typography component="h1" variant="h6">
              "{titulo}"
            </Typography>
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="titulo"
                  label="Titulo"
                  name="titulo"
                  onChange={e =>
                    setForm(prev => ({ ...prev, titulo: e.target.value }))
                  }
                  value={form.titulo}
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDatePicker
                  required
                  fullWidth
                  label="Data"
                  inputFormat="MM/dd/yyyy"
                  value={form.date}
                  onChange={e => {
                    setForm(prev => ({ ...prev, date: e }))
                  }}
                  renderInput={params => (
                    <TextField fullWidth name="validade" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept=".pdf"
                    id="contained-button-file"
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                  />
                  <Button variant="contained" component="span">
                    Procurar conteúdo
                  </Button>
                </label>
              </Grid>
              <LoadingButton
                loadingPosition="start"
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Criar aula
              </LoadingButton>
            </Grid>
          </Box>
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

export default AddLesson
