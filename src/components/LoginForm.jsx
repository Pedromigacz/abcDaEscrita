import React, { useState } from "react"
import { navigate } from "gatsby"

// Mui imports
import Avatar from "@mui/material/Avatar"
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useSnackbar } from "notistack"

// Firebase imports
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

import { authCodeToMessage } from "../components/utils"

firebase.initializeApp({
  apiKey: "AIzaSyA29yoBOYspTnEHo9jzedtBevO6yPI1Q1E",
  authDomain: "projetoteste-7a401.firebaseapp.com",
  projectId: "projetoteste-7a401",
  storageBucket: "projetoteste-7a401.appspot.com",
  messagingSenderId: "1062854484452",
  appId: "1:1062854484452:web:88231160337796232967f1",
  measurementId: "G-CGB1DYX5JL",
})

const auth = firebase.auth()

const theme = createTheme()

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://abcdaescrita.com.br/">
        ABC da escrita
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = event => {
    if (loading) return
    setLoading(true)
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    auth
      .signInWithEmailAndPassword(data.get("email"), data.get("password"))
      .then(obj => {
        enqueueSnackbar("Login realizado com sucesso", { variant: "success" })
        setLoading(false)
        if (obj.user && obj.user.email === "tradojo@gmail.com") {
          navigate("/admin")
        }
      })
      .catch(err => {
        enqueueSnackbar(authCodeToMessage(err.code), { variant: "error" })
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ABC da escrita Login
            </Typography>
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
                autoFocus
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
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
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
