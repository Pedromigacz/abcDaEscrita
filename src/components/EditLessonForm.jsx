import React, { useState, useContext, useEffect } from "react"
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
import Button from "@mui/material/Button"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import Grid from "@mui/material/Grid"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"

import NumberFormat from "react-number-format"

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      isNumericString
    />
  )
})

const EditLesson = ({ lessonId }) => {
  const [form, setForm] = useState({
    titulo: "",
    date: new Date(),
    conteudo: "/",
    index: "0",
  })
  const { getLesson, updateLesson } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    const res = await updateLesson(lessonId, form)
    console.log(res)
    setLoading(false)
  }

  useEffect(() => {
    getLesson(lessonId).then(data => {
      setForm(prev => ({
        ...prev,
        titulo: data.titulo,
        date: new Date(data.data.toDate()),
        conteudo: data.conteudo,
        index: data.index,
      }))
      setLoading(false)
    })
  }, [getLesson, lessonId])

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
            Formul??rio de edi????o de aula
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
                <TextField
                  required
                  fullWidth
                  label="N??mero indexador"
                  value={form.index}
                  onChange={e =>
                    setForm(prev => ({ ...prev, index: e.target.value }))
                  }
                  name="index"
                  id="index"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
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
                <a target="_blank" rel="noreferrer" href={form.conteudo}>
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<RemoveRedEyeIcon />}
                  >
                    Ver conte??do
                  </Button>
                </a>
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
            </Grid>
          </Box>
        </Box>
      </LocalizationProvider>
    </Container>
  )
}

export default EditLesson
