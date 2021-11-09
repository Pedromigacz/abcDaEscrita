import React, { useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"

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

export const mainListItems = (
  <div>
    <ListSubheader inset>Conteúdo</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <ListItemText primary="Criar curso" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ManageSearchIcon />
      </ListItemIcon>
      <ListItemText primary="Gerenciar cursos" />
    </ListItem>
  </div>
)

export const SecondaryListItems = () => {
  const { sair } = useContext(FirebaseContext)
  return (
    <div>
      <ListSubheader inset>Autenticação</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Adicionar usuário" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Gerenciar usuários" />
      </ListItem>
      <ListItem button onClick={sair}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItem>
    </div>
  )
}
