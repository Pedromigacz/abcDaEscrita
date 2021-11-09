import React, { createContext, useState, useEffect } from "react"

export const FirebaseContext = createContext()

// Firebase config
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

firebase.initializeApp({
  apiKey: "AIzaSyA29yoBOYspTnEHo9jzedtBevO6yPI1Q1E",
  authDomain: "projetoteste-7a401.firebaseapp.com",
  projectId: "projetoteste-7a401",
  storageBucket: "projetoteste-7a401.appspot.com",
  messagingSenderId: "1062854484452",
  appId: "1:1062854484452:web:88231160337796232967f1",
  measurementId: "G-CGB1DYX5JL",
})

const auth = firebase.auth()

const FirebaseContextProvider = props => {
  return (
    <FirebaseContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
