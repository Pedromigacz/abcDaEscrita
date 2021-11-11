import React, { createContext } from "react"
import { navigate } from "gatsby"

// Firebase config
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import { signOut } from "firebase/auth"

// Notifications
import { useSnackbar } from "notistack"
import { authCodeToMessage } from "../components/utils"

const config = {
  apiKey: "AIzaSyA29yoBOYspTnEHo9jzedtBevO6yPI1Q1E",
  authDomain: "projetoteste-7a401.firebaseapp.com",
  projectId: "projetoteste-7a401",
  storageBucket: "projetoteste-7a401.appspot.com",
  messagingSenderId: "1062854484452",
  appId: "1:1062854484452:web:88231160337796232967f1",
  measurementId: "G-CGB1DYX5JL",
}

firebase.initializeApp(config)

let createUserApp = firebase.initializeApp(config, "createUserApp")

export const FirebaseContext = createContext()

const db = firebase.firestore()
const auth = firebase.auth()

const FirebaseContextProvider = props => {
  const { enqueueSnackbar } = useSnackbar()

  const sair = () =>
    signOut(auth)
      .then(() => {
        enqueueSnackbar("Sessão encerrada com sucesso", { variant: "success" })
        navigate("/")
      })
      .catch(err => {
        enqueueSnackbar("Algo de errado ocorreu", { variant: "error" })
        navigate("/")
      })

  const entrar = (email, password) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then(obj => {
        enqueueSnackbar("Login realizado com sucesso", { variant: "success" })
        if (obj.user && obj.user.email === "admin@admin.com") {
          navigate("/admin")
        }
        return obj
      })
      .catch(err => {
        enqueueSnackbar(authCodeToMessage(err.code), { variant: "error" })
        return err
      })

  const registrar = async ({ email, senha, validade, cursos }) => {
    try {
      const newUser = await createUserApp
        .auth()
        .createUserWithEmailAndPassword(email, senha)

      const newUserDoc = await db.collection("/users").add({
        email: newUser.user.email,
        userRef: newUser.user.uid,
        validade,
        cursos,
      })

      const user = await newUserDoc.get()

      enqueueSnackbar(`Usuário "${user.data().email}" criado com sucesso`, {
        variant: "success",
      })
    } catch (err) {
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
    return
  }

  const getUsers = async () =>
    db
      .collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      )

  const getUser = id =>
    db
      .collection("users")
      .doc(id)
      .get()
      .then(res => res.data())

  const getCourses = () =>
    db
      .collection("cursos")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      })
      .catch(err => {
        enqueueSnackbar("Ops, algo de errado ocorreu" + err.code, {
          variant: "error",
        })
      })

  return (
    <FirebaseContext.Provider
      value={{
        entrar,
        sair,
        getCourses,
        registrar,
        getUsers,
        getUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
