import React, { useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"
import { Link } from "gatsby"

// Material ui imports
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import PeopleIcon from "@mui/icons-material/People"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import EmailIcon from "@mui/icons-material/Email"
import PasswordIcon from "@mui/icons-material/Password"

export const UserCoursesList = () => (
  <div>
    <ListSubheader inset>Cursos</ListSubheader>
    <Link
      to="/admin/addCourse"
      style={{ textDecoration: "none", color: "unset" }}
    >
      <ListItem button>
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary="Criar curso" />
      </ListItem>
    </Link>
    <Link
      to="/admin/getCourses"
      style={{ textDecoration: "none", color: "unset" }}
    >
      <ListItem button>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="Gerenciar cursos" />
      </ListItem>
    </Link>
    <Link
      to="/admin/getLessons"
      style={{ textDecoration: "none", color: "unset" }}
    >
      <ListItem button>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="Gerenciar aulas" />
      </ListItem>
    </Link>
  </div>
)

export const UserProfileList = () => {
  const { sair } = useContext(FirebaseContext)
  return (
    <div>
      <ListSubheader inset>Perfil</ListSubheader>
      <Link
        to="/alunos/changePassword"
        style={{ textDecoration: "none", color: "unset" }}
      >
        <ListItem button>
          <ListItemIcon>
            <PasswordIcon />
          </ListItemIcon>
          <ListItemText primary="Trocar senha" />
        </ListItem>
      </Link>
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
