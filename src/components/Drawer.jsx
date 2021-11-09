import React from "react"
import { mainListItems, SecondaryListItems } from "../components/ListItems.jsx"

// mui imports
import MuiDrawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import { styled } from "@mui/material/styles"

const drawerWidth = 240

const DrawerOpts = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const Drawer = ({ toggleDrawer, open }) => {
  return (
    <DrawerOpts variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>
        <SecondaryListItems />
      </List>
    </DrawerOpts>
  )
}

export default Drawer
