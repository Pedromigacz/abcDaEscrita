import React, { useState, useEffect } from "react"
import * as styles from "../../../styles/lessonPage.module.css"

// materiau lui loader
import CircularProgress from "@mui/material/CircularProgress"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"

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

let ReactPdf
async function dynamicImportModule() {
  ReactPdf = await import("react-pdf")
  ReactPdf.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${ReactPdf.pdfjs.version}/pdf.worker.js`

  return
  // perform remaining tasks with dynamicModule
}

const LessonPage = props => {
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState("")
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    dynamicImportModule().then(() => {
      setLoading(false)
    })

    setUrl(getLessonContent(props))
  }, [setUrl, props])

  return (
    <div className={styles.container}>
      <CssBaseline />
      <h1>Cabeçalho</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <ReactPdf.Document
          file={{ url: url }}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={CircularIndeterminate}
          onContextMenu={e => e.preventDefault()}
        >
          <Paper elevation={3} sx={{ mb: 15 }}>
            {Array.from(new Array(numPages), (el, index) => (
              <ReactPdf.Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={2}
              />
            ))}
          </Paper>
        </ReactPdf.Document>
      )}
    </div>
  )
}

export default LessonPage
