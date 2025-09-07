import React, {useState, useEffect} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './App.css'

import FileUpload from './components/FileUpload'
import ResumeAnalysis from './components/ResumeAnalysis'
import HistoryTable from './components/HistoryTable'
import DetailsModal from './components/DetailsModal'
import {resumeAPI} from './services/api'

function App() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resumes, setResumes] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const data = await resumeAPI.getAllResumes()
      setResumes(data)
    } catch (error) {
      console.error('Error fetching resumes:', error)
    }
  }

  const handleFileUpload = async file => {
    setLoading(true)
    try {
      const result = await resumeAPI.uploadResume(file)
      setAnalysisResult(result.data)
      fetchResumes() // Refresh the history
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = async resumeId => {
    try {
      const resume = await resumeAPI.getResumeById(resumeId)
      setSelectedResume(resume)
      setModalIsOpen(true)
    } catch (error) {
      console.error('Error fetching resume details:', error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Analyzer</h1>
      </header>

      <Tabs>
        <TabList>
          <Tab>Live Resume Analysis</Tab>
          <Tab>Historical Viewer</Tab>
        </TabList>

        <TabPanel>
          <div className="upload-section">
            <FileUpload onFileUpload={handleFileUpload} loading={loading} />
            {analysisResult && <ResumeAnalysis analysis={analysisResult} />}
          </div>
        </TabPanel>

        <TabPanel>
          <HistoryTable resumes={resumes} onViewDetails={handleViewDetails} />
        </TabPanel>
      </Tabs>

      <DetailsModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        resume={selectedResume}
      />
    </div>
  )
}

export default App
