import React, { createContext } from "react"
import { navigate } from "gatsby"

// Firebase config
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

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
const storage = firebase.storage()

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
        } else if (obj.user) {
          navigate("/alunos")
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

  const updateUser = async (id, data) =>
    await db
      .collection("users")
      .doc(id)
      .get()
      .then(snapshot =>
        snapshot.ref.update({
          validade: data.validade,
          cursos: data.cursos
            .map(crs => (crs.checked ? crs.data.id : null))
            .filter(crs => crs !== null),
        })
      )
      .then(res => {
        enqueueSnackbar(`Usuário atualizado com sucesso`, {
          variant: "success",
        })
        return res
      })
      .catch(err => {
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      })

  const deleteUser = id =>
    db
      .collection("users")
      .doc(id)
      .delete()
      .then(res => {
        enqueueSnackbar(`Usuário removido com sucesso`, {
          variant: "success",
        })
        return res
      })
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )

  const getCourses = () =>
    db
      .collection("cursos")
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          originalDoc: doc,
        }))
      )
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )

  const getLessons = () =>
    db
      .collection("aulas")
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          originalDoc: doc,
        }))
      )
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )

  const resetPassword = email =>
    auth
      .sendPasswordResetEmail(email)
      .then(res => {
        enqueueSnackbar(`Email de redefinição de senha enviado com sucesso`, {
          variant: "success",
        })
        return res
      })
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )

  const resetSelfPassword = () => {
    const email = auth.currentUser.email
    return auth
      .sendPasswordResetEmail(email)
      .then(res => {
        enqueueSnackbar(`Email de redefinição de senha enviado com sucesso`, {
          variant: "success",
        })
        return res
      })
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )
  }

  const changeEmail = async ({ email, password, newEmail }) => {
    try {
      // update user
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
          userCredential.user.updateEmail(newEmail)
        })

      // update user doc
      const res = await db
        .collection("users")
        .where("userRef", "==", auth.currentUser.uid)
        .limit(1)
        .get()

      await res.docs[0].ref.update({ email: newEmail })

      enqueueSnackbar("Email atualizado com sucesso", {
        variant: "success",
      })
      return
    } catch (err) {
      console.log(err)
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
  }

  const addCourse = async title => {
    if (!title || title.length <= 0) {
      return enqueueSnackbar("Curso não pode ser criado sem um título", {
        variant: "error",
      })
    }

    // if course already exists
    const verificationVariable = await db
      .collection("/cursos")
      .where("titulo", "==", title)
      .get()

    if (verificationVariable.docs.length >= 1) {
      return enqueueSnackbar("Este curso já existe", {
        variant: "error",
      })
    }

    return db
      .collection("/cursos")
      .doc(title)
      .set({ titulo: title })
      .then(res => {
        enqueueSnackbar(`Curso criado com sucesso`, {
          variant: "success",
        })
        return res
      })
      .catch(err =>
        enqueueSnackbar(authCodeToMessage(err.code), {
          variant: "error",
        })
      )
  }

  const addLesson = async (form, file, courseId) => {
    if (form.titulo >= 0) {
      enqueueSnackbar("Não é permitida a criação de uma aula sem título", {
        variant: "error",
      })
      return
    }
    if (!file) {
      enqueueSnackbar("É necessário ter um arquivo para criar uma aula", {
        variant: "error",
      })
      return
    }
    try {
      const storageFile = await storage
        .ref(`aulas/${Math.random()}${file.name}`)
        .put(file)

      const fileUrl = await storageFile.ref.getDownloadURL()

      const newLesson = await db.collection("/aulas").add({
        titulo: form.titulo,
        index: form.index,
        data: form.date,
        curso: `/cursos/${courseId}`,
        conteudo: fileUrl,
      })

      enqueueSnackbar(`Aula criada com sucesso`, {
        variant: "success",
      })

      return newLesson
    } catch (err) {
      console.log(err)
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
  }
  const updateLesson = async (lessonId, form) => {
    try {
      const snapshot = await db.collection("aulas").doc(lessonId).get()

      const newLesson = {}
      if (form.titulo) newLesson.titulo = form.titulo
      if (form.date) newLesson.data = form.date

      await snapshot.ref.update(newLesson)

      enqueueSnackbar(`Aula atualizada com sucesso`, {
        variant: "success",
      })

      return snapshot
    } catch (err) {
      console.log(err)
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
  }

  const updateCourse = (id, newTitle) =>
    db
      .collection("cursos")
      .doc(id)
      .get()
      .then(snapshot =>
        snapshot.ref
          .update({
            titulo: newTitle,
          })
          .then(res => {
            enqueueSnackbar(`Curso atualizado com sucesso`, {
              variant: "success",
            })
            return res
          })
          .catch(err => {
            enqueueSnackbar(authCodeToMessage(err.code), {
              variant: "error",
            })
          })
      )

  const deleteCourse = async courseId => {
    if (!courseId) {
      enqueueSnackbar("Algo de errado ocorreu", {
        variant: "error",
      })
      return
    }
    try {
      const curso = await db.collection("cursos").doc(courseId).get()

      const aulas = await db
        .collection("aulas")
        .where("curso", "==", `/cursos/${curso.id}`)
        .get()

      const conteudoArray = await Promise.all(
        aulas.docs.map(async aula => storage.refFromURL(aula.data().conteudo))
      )

      try {
        await Promise.all(conteudoArray.map(conteudo => conteudo.delete()))
        enqueueSnackbar(`Conteúdos deletados com sucesso`, {
          variant: "success",
        })
      } catch (err) {
        enqueueSnackbar(
          `Conteúdos não encontrados, pulando para o próximo passo`,
          {
            variant: "success",
          }
        )
      }

      await Promise.all(aulas.docs.map(aula => aula.ref.delete()))
      enqueueSnackbar(`Aulas apagadas com sucesso`, {
        variant: "success",
      })

      await curso.ref.delete()
      enqueueSnackbar(`Curso apagado com sucesso`, {
        variant: "success",
      })
    } catch (err) {
      console.log(err)
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
    return
  }
  const deleteLesson = async lessonId => {
    if (!lessonId) {
      enqueueSnackbar("Algo de errado ocorreu", {
        variant: "error",
      })
      return
    }

    try {
      const aula = await db.collection("aulas").doc(lessonId).get()

      try {
        const contentRef = await storage.refFromURL(aula.data().conteudo)
        await contentRef.delete()

        enqueueSnackbar(`Conteúdo deletado com sucesso`, {
          variant: "success",
        })
      } catch (err) {
        enqueueSnackbar(
          `Conteúdos não encontrados, pulando para o próximo passo`,
          {
            variant: "success",
          }
        )
      }

      await aula.ref.delete()
      enqueueSnackbar(`Aula apagada com sucesso`, {
        variant: "success",
      })
      return
    } catch (err) {
      enqueueSnackbar(authCodeToMessage(err.code), {
        variant: "error",
      })
    }
  }

  const getLesson = lessonId =>
    db
      .collection("aulas")
      .doc(lessonId)
      .get()
      .then(res => ({ ...res.data(), id: res.id }))
      .catch(err => {
        enqueueSnackbar(authCodeToMessage(err.code), { variant: "error" })
        return err
      })

  // alunos methods
  const getUserClasses = async () => {
    try {
      const userDataQuery = await db
        .collection("users")
        .where("userRef", "==", auth.currentUser.uid)
        .get()

      let userData
      userDataQuery.forEach(user => {
        userData = user
      })

      const courseListWithData = await Promise.all(
        userData.data().cursos.map(async courseId => ({
          ...(await db.collection("cursos").doc(courseId).get()).data(),
          id: courseId,
        }))
      )

      const completeCourseList = await Promise.all(
        courseListWithData.map(async course => {
          let lessons = []
          const lessonsQuery = await db
            .collection("aulas")
            .where("curso", "==", `/cursos/${course.id}`)
            .get()

          await lessonsQuery.forEach(lssn => {
            lessons = [...lessons, { ...lssn.data(), id: lssn.id }]
          })

          return { ...course, lessons }
        })
      )
      return completeCourseList
    } catch (err) {
      enqueueSnackbar(
        "Credenciais expiradas, por favor, saia da sua conta e logue novamente",
        { variant: "error" }
      )
      return err
    }
  }
  return (
    <FirebaseContext.Provider
      value={{
        entrar,
        sair,
        getCourses,
        registrar,
        getUsers,
        getUser,
        updateUser,
        deleteUser,
        resetPassword,
        addCourse,
        updateCourse,
        addLesson,
        updateLesson,
        deleteCourse,
        getLessons,
        deleteLesson,
        getLesson,
        getUserClasses,
        resetSelfPassword,
        changeEmail,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider
