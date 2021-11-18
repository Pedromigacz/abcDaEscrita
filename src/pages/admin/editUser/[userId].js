import React from "react"
import { EditUserForm } from "../../../components"
import AdminTemplate from "../../../templates/AdminTemplate.jsx"

const EditUser = props => {
  return (
    <AdminTemplate>
      <EditUserForm userId={props.params.userId} />
    </AdminTemplate>
  )
}

export default EditUser
