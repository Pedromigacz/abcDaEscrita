import React, { createContext, useState, useEffect } from "react"
import { navigate } from "gatsby"

// Firebase config
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

import { signOut } from "firebase/auth"

// Notifications
import { useSnackbar } from "notistack"

firebase.initializeApp({
  apiKey: "AIzaSyA29yoBOYspTnEHo9jzedtBevO6yPI1Q1E",
  authDomain: "projetoteste-7a401.firebaseapp.com",
  projectId: "projetoteste-7a401",
  storageBucket: "projetoteste-7a401.appspot.com",
  messagingSenderId: "1062854484452",
  appId: "1:1062854484452:web:88231160337796232967f1",
  measurementId: "G-CGB1DYX5JL",
})

export const FirebaseContext = createContext()

const auth = firebase.auth()

console.log(auth)

const FirebaseContextProvider = props => {
  const { enqueueSnackbar } = useSnackbar()

  const sair = () => {
    signOut(auth)
      .then(() => {
        enqueueSnackbar("Sucesso", { variant: "success" })
        navigate("/")
      })
      .catch(err => {
        enqueueSnackbar("Algo de errado ocorreu", { variant: "error" })
        navigate("/")
      })
  }

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        sair,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
