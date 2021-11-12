import React, { useState, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"

// mui imports
import Box from "@mui/material/Box"
import LoadingButton from "@mui/lab/LoadingButton"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: "1rem 2rem 3rem 2rem",
}

export default function BasicModal({ open, handleClose }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const { resetPassword } = useContext(FirebaseContext)

  const handleClick = e => {
    if (loading) return
    setLoading(true)
    resetPassword(email).then(e => {
      setLoading(false)
      handleClose()
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" sx={{ mt: 2 }}>
          Digite o email da conta que deseja recuperar a senha:
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="email"
          onChange={e => {
            setEmail(e.target.value)
          }}
          value={email}
        />
        <LoadingButton
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
          style={{ marginTop: 12 }}
          variant="contained"
          onClick={handleClick}
        >
          Recuperar
        </LoadingButton>
      </Box>
    </Modal>
  )
}
