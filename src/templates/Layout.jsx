import React from "react"
import { SnackbarProvider } from "notistack"
import FirebaseContextProvider from "../contexts/firebaseContext.js"

const Layout = ({ children }) => {
  return (
    <FirebaseContextProvider>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </FirebaseContextProvider>
  )
}

export default Layout
