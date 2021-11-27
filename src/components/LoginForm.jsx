import React, { useState, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import { Copyright, ResetPasswordModal } from "../components"

// Mui imports
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import BlueVerticalLogo from "../vectors/BlueVerticalLogo.jsx"

const theme = createTheme()

const LoginForm = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const { entrar } = useContext(FirebaseContext)

  const openResetModal = e => {
    e.preventDefault()
    setOpen(true)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (loading) return
    setLoading(true)

    entrar(form.email, form.password)
      .then(obj => {
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BlueVerticalLogo />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e => {
                  setForm({ ...form, email: e.target.value })
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  setForm({ ...form, password: e.target.value })
                }}
              />
              <LoadingButton
                loadingPosition="start"
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link
                    variant="body2"
                    onClick={openResetModal}
                    style={{ cursor: "pointer" }}
                  >
                    Esqueceu sua senha?
                  </Link>
                  <ResetPasswordModal
                    open={open}
                    handleClose={() => {
                      setOpen(false)
                    }}
                  />
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  )
}

export default LoginForm
