import React, {useState} from 'react'
import {ClipLoader} from 'react-spinners'

const FileUpload = ({onFileUpload, loading}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = e => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = file => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }
    setSelectedFile(file)
  }

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <div className="file-upload-container">
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          accept=".pdf"
          onChange={handleChange}
          style={{display: 'none'}}
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-icon">📄</div>
          <p>Drag and drop your resume PDF here or click to browse</p>
          {selectedFile && (
            <p className="selected-file">Selected: {selectedFile.name}</p>
          )}
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || loading}
        className="analyze-btn"
      >
        {loading ? (
          <>
            <ClipLoader size={20} color="#fff" />
            <span>Analyzing...</span>
          </>
        ) : (
          'Analyze Resume'
        )}
      </button>
    </div>
  )
}

export default FileUpload
