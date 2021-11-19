import React from "react"
import { EditLessonForm } from "../../../components"
import AdminTemplate from "../../../templates/AdminTemplate.jsx"

const DashboardContent = props => (
  <AdminTemplate>
    <EditLessonForm lessonId={props.params.lessonId} />
  </AdminTemplate>
)

export default DashboardContent
