import React from "react"
import { SnackbarProvider } from "notistack"

const Layout = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
}

export default Layout
