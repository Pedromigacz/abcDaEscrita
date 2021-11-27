import React, { useState, useContext } from "react"
import { FirebaseContext } from "../../contexts/firebaseContext.js"
import UserTemplate from "../../templates/UserTemplate.jsx"

// material ui
import Avatar from "@mui/material/Avatar"
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

export default function ChangeEmail() {
  const [data, setData] = useState({ email: "", password: "", newEmail: "" })
  const { changeEmail } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (loading) {
      return
    }
    setLoading(true)
    changeEmail(data).then(res => setLoading(false))
  }

  return (
    <UserTemplate>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Trocar email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Antigo"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={e =>
                setData(prev => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={e =>
                setData(prev => ({ ...prev, password: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Email Novo"
              label="Email Novo"
              type="Email Novo"
              id="Email Novo"
              value={data.newEmail}
              onChange={e =>
                setData(prev => ({ ...prev, newEmail: e.target.value }))
              }
            />

            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Trocar email
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </UserTemplate>
  )
}
