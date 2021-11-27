import React, { useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import { Link } from "gatsby"

// Material ui imports
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import LogoutIcon from "@mui/icons-material/Logout"
import EmailIcon from "@mui/icons-material/Email"
import PasswordIcon from "@mui/icons-material/Password"
import HomeIcon from "@mui/icons-material/Home"

export const UserCoursesList = () => {
  return (
    <>
      <div>
        <ListSubheader inset>Menu</ListSubheader>
        <Link
          to="/alunos/home"
          style={{ textDecoration: "none", color: "unset" }}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
      </div>
      <UserProfileList />
    </>
  )
}

export const UserProfileList = () => {
  const { sair, resetSelfPassword } = useContext(FirebaseContext)
  return (
    <div>
      <ListItem button onClick={resetSelfPassword}>
        <ListItemIcon>
          <PasswordIcon />
        </ListItemIcon>
        <ListItemText primary="Trocar senha" />
      </ListItem>
      <Link
        to="/alunos/changeEmail"
        style={{ textDecoration: "none", color: "unset" }}
      >
        <ListItem button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Trocar email" />
        </ListItem>
      </Link>
      <ListItem button onClick={sair}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div>
  )
}
