import React, { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../../../contexts/firebaseContext.js"
import * as styles from "../../../styles/lessonPage.module.css"
import { LessonHeader, BottomNavigation } from "../../../components/"
import "react-pdf/dist/umd/Page/AnnotationLayer.css"

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

function removeTextLayerOffset() {
  const textLayers = document.querySelectorAll(".react-pdf__Page__textContent")
  textLayers.forEach(layer => {
    const { style } = layer
    style.top = "-0.5%"
    style.left = "0"
    style.transform = ""
  })
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
  const [lessonData, setLessonData] = useState({})
  const [numPages, setNumPages] = useState(null)
  const { getLesson } = useContext(FirebaseContext)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    ;(async () => {
      await dynamicImportModule()
      setLessonData(await getLesson(props.params.lessonId))
      setLoading(false)
    })()
  }, [props])

  return (
    <>
      <LessonHeader />
      <div className={styles.container} id="topo">
        <CssBaseline />
        {loading ? (
          <CircularProgress />
        ) : (
          <ReactPdf.Document
            file={{ url: lessonData.conteudo }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={CircularIndeterminate}
            onContextMenu={e => e.preventDefault()}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Paper
                elevation={3}
                sx={{ mb: 15 }}
                id={`page${index + 1}`}
                key={index}
              >
                <ReactPdf.Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  onLoadSuccess={removeTextLayerOffset}
                  scale={2}
                />
              </Paper>
            ))}
          </ReactPdf.Document>
        )}
      </div>
      <BottomNavigation />
    </>
  )
}

export default LessonPage
