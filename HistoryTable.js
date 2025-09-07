import React from 'react'

const HistoryTable = ({resumes, onViewDetails}) => {
  return (
    <div className="history-container">
      <h2>Resume Analysis History</h2>

      {resumes.length === 0 ? (
        <p className="no-data">No resumes analyzed yet</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map(resume => (
              <tr key={resume.id}>
                <td>{resume.personalDetails?.name || 'N/A'}</td>
                <td>{resume.personalDetails?.email || 'N/A'}</td>
                <td>{resume.fileName}</td>
                <td>{new Date(resume.uploadedAt).toLocaleDateString()}</td>
                <td>{resume.aiFeedback?.rating || 'N/A'}/10</td>
                <td>
                  <button
                    className="details-btn"
                    onClick={() => onViewDetails(resume.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default HistoryTable
