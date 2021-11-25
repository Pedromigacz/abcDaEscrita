import React from "react"
import * as styles from "../styles/LessonHeader.module.css"
import BlueHorizontalLogo from "../vectors/BlueHorizontalLogo.jsx"

const LessonHeader = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <BlueHorizontalLogo />
      </div>
    </nav>
  )
}

export default LessonHeader
