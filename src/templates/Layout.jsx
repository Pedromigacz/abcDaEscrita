import React from "react"
import { SnackbarProvider } from "notistack"
import FirebaseContextProvider from "../contexts/firebaseContext.js"

const Layout = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <FirebaseContextProvider>{children}</FirebaseContextProvider>
    </SnackbarProvider>
  )
}

export default Layout
