import React from 'react'

const ResumeAnalysis = ({analysis}) => {
  if (!analysis) return null

  const {personalDetails, resumeContent, skills, aiFeedback} = analysis

  const renderRating = rating => {
    const stars = '⭐'.repeat(Math.floor(rating / 2))
    return `${rating}/10 ${stars}`
  }

  return (
    <div className="analysis-container">
      <h2>Resume Analysis Results</h2>

      {/* Personal Details */}
      <div className="section">
        <h3>Personal Details</h3>
        <div className="details-grid">
          <div>
            <strong>Name:</strong> {personalDetails?.name || 'N/A'}
          </div>
          <div>
            <strong>Email:</strong> {personalDetails?.email || 'N/A'}
          </div>
          <div>
            <strong>Phone:</strong> {personalDetails?.phone || 'N/A'}
          </div>
          <div>
            <strong>LinkedIn:</strong> {personalDetails?.linkedin || 'N/A'}
          </div>
          <div>
            <strong>Portfolio:</strong> {personalDetails?.portfolio || 'N/A'}
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="section">
        <h3>Resume Content</h3>

        {resumeContent?.summary && (
          <div className="subsection">
            <h4>Summary</h4>
            <p>{resumeContent.summary}</p>
          </div>
        )}

        {resumeContent?.workExperience?.length > 0 && (
          <div className="subsection">
            <h4>Work Experience</h4>
            {resumeContent.workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h5>
                  {exp.position} at {exp.company}
                </h5>
                <p className="duration">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {resumeContent?.education?.length > 0 && (
          <div className="subsection">
            <h4>Education</h4>
            {resumeContent.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h5>{edu.degree}</h5>
                <p>
                  {edu.institution} - {edu.year}
                </p>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {resumeContent?.projects?.length > 0 && (
          <div className="subsection">
            <h4>Projects</h4>
            {resumeContent.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h5>{project.name}</h5>
                <p>{project.description}</p>
                <p className="tech-stack">
                  Technologies: {project.technologies}
                </p>
              </div>
            ))}
          </div>
        )}

        {resumeContent?.certifications?.length > 0 && (
          <div className="subsection">
            <h4>Certifications</h4>
            <ul>
              {resumeContent.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="section">
        <h3>Skills</h3>
        <div className="skills-container">
          <div className="skill-category">
            <h4>Technical Skills</h4>
            <div className="skill-tags">
              {skills?.technical?.map((skill, index) => (
                <span key={index} className="skill-tag technical">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h4>Soft Skills</h4>
            <div className="skill-tags">
              {skills?.soft?.map((skill, index) => (
                <span key={index} className="skill-tag soft">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="section ai-feedback">
        <h3>AI-Generated Feedback</h3>

        <div className="rating-section">
          <h4>Resume Rating</h4>
          <div className="rating">{renderRating(aiFeedback?.rating || 0)}</div>
        </div>

        {aiFeedback?.overallFeedback && (
          <div className="feedback-section">
            <h4>Overall Feedback</h4>
            <p>{aiFeedback.overallFeedback}</p>
          </div>
        )}

        {aiFeedback?.improvementAreas?.length > 0 && (
          <div className="improvement-section">
            <h4>Areas for Improvement</h4>
            <ul>
              {aiFeedback.improvementAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        )}

        {aiFeedback?.suggestedSkills?.length > 0 && (
          <div className="suggested-skills">
            <h4>Suggested Skills to Learn</h4>
            <div className="skill-tags">
              {aiFeedback.suggestedSkills.map((skill, index) => (
                <span key={index} className="skill-tag suggested">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalysis
