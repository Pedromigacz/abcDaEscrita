import React, { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../contexts/firebaseContext.js"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"

function dataAtualFormatada() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length === 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length === 1 ? "0" + mes : mes,
    anoF = data.getFullYear()
  return diaF + "/" + mesF + "/" + anoF
}

const UserCourseList = () => {
  const [courses, setCourses] = useState([])
  const { getUserClasses } = useContext(FirebaseContext)

  useEffect(() => {
    getUserClasses().then(setCourses)
  }, [])

  return (
    <div>
      <h1>Cursos:</h1>
      <div>
        {courses && courses.length
          ? courses.map(course => (
              <span key={course.id}>
                <List
                  sx={{
                    width: "100%",
                    minWidth: "320px",
                    "max-width": "unset",
                    bgcolor: "background.paper",
                    "border-radius": 10,
                    mt: 4,
                    mb: 6,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", "text-align": "center", mt: 3, mb: 3 }}
                  >
                    {course.titulo}
                  </Typography>
                  {course.lessons
                    ? course.lessons.map(lesson => (
                        <span key={lesson.id}>
                          <ListItem>
                            <Link
                              style={{
                                display: "inline-block",
                                width: "100%",
                                "text-decoration": "none",
                              }}
                              to={`/alunos/aulas/${
                                lesson.id
                              }?lesson=${encodeURIComponent(lesson.conteudo)}`}
                            >
                              <ListItemButton
                                style={{
                                  cursor: "pointer",
                                  "text-decoration": "none",
                                  color: "rgba(0, 0, 0, 0.87)",
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar>
                                    <VisibilityIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={lesson.titulo}
                                  secondary={dataAtualFormatada(
                                    new Date(lesson.data.seconds)
                                  )}
                                />
                              </ListItemButton>
                            </Link>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </span>
                      ))
                    : "Parece que este curso ainda não possui nenhuma aula adicionada a ele"}
                </List>
              </span>
            ))
          : "Carregando..."}
      </div>
    </div>
  )
}

export default UserCourseList
