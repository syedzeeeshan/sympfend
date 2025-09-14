import React from 'react';
import '../styles/TeamPlaceholders.css';

const TeamPlaceholders = () => {
  const teamRoles = [
    'Event Director', 'Technical Lead', 'Marketing Head', 'Operations Manager',
    'Sponsorship Lead', 'Design Head', 'Content Manager', 'Logistics Coordinator'
  ];

  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
          {teamRoles.map((role, index) => (
            <div 
              key={index} 
              className="team-placeholder"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="team-photo-placeholder">
                <div className="photo-icon">👤</div>
              </div>
              <div className="team-name">Team Member {index + 1}</div>
              <div className="team-role">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPlaceholders;
