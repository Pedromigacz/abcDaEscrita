import React, { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"

// mui imports
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"

const AddUserForm = () => {
  const [cursos, setCursos] = useState([])
  const [cursosSlct, setCursosSlct] = useState([])
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)

  const { getCourses, registrar } = useContext(FirebaseContext)

  useEffect(() => {
    // TODO fetch firestore for courses
    getCourses().then(cursos => {
      setCursos(cursos)
    })
  }, [])

  const handleSelectChanges = e => {
    if (e.target.checked) {
      setCursosSlct([...cursosSlct, e.target.value])
    } else {
      setCursosSlct(cursosSlct.filter(crs => crs !== e.target.value))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    const form = new FormData(e.currentTarget)

    await registrar({
      email: form.get("email"),
      senha: form.get("password"),
      validade: date,
      cursos: cursosSlct,
    })
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
            Adicionar novo usuário
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
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDatePicker
                  required
                  fullWidth
                  label="Validade da conta"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={setDate}
                  renderInput={params => (
                    <TextField fullWidth name="validade" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Cursos:</FormLabel>
                  <FormGroup>
                    {cursos &&
                      cursos.map(curso => (
                        <FormControlLabel
                          control={<Checkbox />}
                          label={curso.titulo}
                          id={curso.id}
                          key={curso.id}
                          value={curso.id}
                          onChange={handleSelectChanges}
                        />
                      ))}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
            <LoadingButton
              loadingPosition="start"
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Adicionar usuário
            </LoadingButton>
          </Box>
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

export default AddUserForm
