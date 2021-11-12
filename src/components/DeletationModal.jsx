import React, { useState, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import Box from "@mui/material/Box"
import LoadingButton from "@mui/lab/LoadingButton"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

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

export default function BasicModal({ user, handleClose, fetchData }) {
  const [loading, setLoading] = useState(false)
  const { deleteUser } = useContext(FirebaseContext)

  const handleClick = e => {
    if (loading) return
    setLoading(true)
    deleteUser(user.id).then(e => {
      setLoading(false)
      handleClose()
      fetchData()
    })
  }

  return (
    <Modal
      open={user}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" sx={{ mt: 2 }}>
          Tem certeza que deseja remover o usuário "{user && user.email}"?
        </Typography>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<DeleteForeverIcon />}
          style={{ marginTop: 12 }}
          variant="contained"
          color="error"
          onClick={handleClick}
        >
          Sim, tenho certeza
        </LoadingButton>
      </Box>
    </Modal>
  )
}
