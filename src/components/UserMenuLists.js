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

// tree view
import TreeView from "@mui/lab/TreeView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import TreeItem from "@mui/lab/TreeItem"

export const UserCoursesList = () => {
  const { courseList } = useContext(FirebaseContext)

  return (
    <div>
      <ListSubheader inset>Cursos</ListSubheader>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {courseList &&
          courseList.length &&
          courseList.map((course, cKey) => (
            <TreeItem nodeId={cKey} label={course.titulo}>
              lalala
            </TreeItem>
          ))}
        <TreeItem nodeId="1" label="Curso 1">
          <TreeItem nodeId="2" label="Aula 1" />
          <TreeItem nodeId="3" label="Aula 2" />
          <TreeItem nodeId="4" label="Aula 3" />
          <TreeItem nodeId="5" label="Aula 4" />
          <TreeItem nodeId="6" label="Aula 5" />
        </TreeItem>
        <TreeItem nodeId="7" label="Curso 2">
          <TreeItem nodeId="8" label="Aula 1" />
          <TreeItem nodeId="9" label="Aula 2" />
          <TreeItem nodeId="10" label="Aula 3" />
          <TreeItem nodeId="11" label="Aula 4" />
          <TreeItem nodeId="12" label="Aula 5" />
        </TreeItem>
      </TreeView>
    </div>
  )
}

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
