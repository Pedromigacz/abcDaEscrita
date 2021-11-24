import React, { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import * as styles from "../../../styles/lessonPage.module.css"

// materiau lui loader
import CircularProgress from "@mui/material/CircularProgress"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  )
}

const getLessonContent = props => {
  const params = new URLSearchParams(props.location.search)
  return params.get("lesson")
}

const LessonPage = props => {
  const [url, setUrl] = useState("")
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    setUrl(getLessonContent(props))
  }, [setUrl, props])

  return (
    <div className={styles.container}>
      <CssBaseline />
      <h1>Cabeçalho</h1>
      <div className="container">
        <Document
          file={{ url: url }}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={CircularIndeterminate}
        >
          <Paper elevation={3} sx={{ mb: 15 }}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={2}
              />
            ))}
          </Paper>
        </Document>
      </div>
    </div>
  )
}

export default LessonPage
