import React from "react"
import { EditCourserForm } from "../../../components"
import AdminTemplate from "../../../templates/AdminTemplate.jsx"

const DashboardContent = props => (
  <AdminTemplate>
    <EditCourserForm
      id={props.params.courseId}
      titulo={
        Object.fromEntries(
          new URLSearchParams(props.location.search.substring(1))
        ).title
      }
    />
  </AdminTemplate>
)

export default DashboardContent
