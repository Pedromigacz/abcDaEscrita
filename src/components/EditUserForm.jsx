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

const AddUserForm = ({ userId }) => {
  const [form, setForm] = useState({
    email: "",
    cursos: [],
    validade: new Date(),
  })
  const [loading, setLoading] = useState(true)

  const { getCourses, getUser, updateUser } = useContext(FirebaseContext)

  useEffect(() => {
    // TODO fetch firestore for courses
    ;(async () => {
      const cursos = await getCourses()

      await setForm(form => ({
        ...form,
        cursos: cursos.map(crso => ({ data: crso, checked: false })),
      }))

      const userData = await getUser(userId)

      await setForm(prevState => {
        let newForm = { ...prevState }
        newForm.email = userData.email
        newForm.validade = new Date(userData.validade.toDate())
        newForm.cursos = prevState.cursos.map(curso => ({
          ...curso,
          checked: userData.cursos.some(
            userCourse => userCourse === curso.data.id
          ),
        }))
        return newForm
      })

      setLoading(false)
    })()
  }, [getCourses, getUser, userId])

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)
    await updateUser(userId, form)
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
            Editar usuário
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
                  value={form.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDatePicker
                  required
                  fullWidth
                  label="Validade da conta"
                  inputFormat="MM/dd/yyyy"
                  value={form.validade}
                  onChange={e => setForm({ ...form, validade: e })}
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
                    {form.cursos &&
                      form.cursos.map(({ data }, key) => (
                        <FormControlLabel
                          control={<Checkbox />}
                          label={data.titulo}
                          id={data.id}
                          key={data.id}
                          checked={form.cursos[key].checked}
                          onChange={e => {
                            let newForm = { ...form }
                            newForm.cursos[key].checked = e.target.checked
                            setForm(newForm)
                          }}
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
              Salvar
            </LoadingButton>
          </Box>
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

export default AddUserForm
