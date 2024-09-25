import React from "react";

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        
        <textarea id="wd-description">
          The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
          The landing page should include the following: Your full name and section, links to each of the lab assignments, 
          links to the Kanbas application, links to all relevant source code repositories. The Kanbas application should 
          include a link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="quizzes">QUIZZES</option>
                <option value="exams">EXAMS</option>
                <option value="projects">PROJECTS</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="gpa-scale">GPA Scale</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="on-paper">On Paper</option>
                <option value="no-submission">No Submission</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">Online Entry Options</td>
            <td>
              <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <select id="wd-assign-to">
                <option value="everyone">Everyone</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" value="2024-05-13" />
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" value="2024-05-06" />
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" value="2024-05-20" />
            </td>
          </tr>
        </table>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    );
  }
  