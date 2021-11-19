import React from "react"
import { AddLessonForm } from "../../../components"
import AdminTemplate from "../../../templates/AdminTemplate.jsx"

const DashboardContent = props => (
  <AdminTemplate>
    <AddLessonForm
      courseId={props.params.courseId}
      titulo={
        Object.fromEntries(
          new URLSearchParams(props.location.search.substring(1))
        ).title || "(Curso sem titulo)"
      }
    />
  </AdminTemplate>
)

export default DashboardContent
