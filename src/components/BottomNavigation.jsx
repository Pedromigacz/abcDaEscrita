import * as React from "react"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft"
import HomeIcon from "@mui/icons-material/Home"
import { Link } from "gatsby"

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <Link to="/alunos">
          <BottomNavigationAction showLabel label="Home" icon={<HomeIcon />} />
        </Link>
        <Link to="#topo">
          <BottomNavigationAction
            showLabel
            label="Topo da aula"
            icon={<TurnSlightLeftIcon />}
          />
        </Link>
      </BottomNavigation>
    </Box>
  )
}
