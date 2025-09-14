import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/TeamLeaders.css';

const TeamLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const response = await apiService.getTeamLeaders();
      if (response.data.success) {
        setLeaders(response.data.data);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching team leaders:', error);
      setError('Failed to load team information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="team-leaders">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="loading">Loading team information...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-leaders">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="team-leaders">
      <div className="container">
        <h2>Meet Our Team</h2>
        <p className="section-description">
          The brilliant minds behind Zehinix Symposium
        </p>
        
        {leaders.length === 0 ? (
          <div className="no-team">
            Team information will be available soon.
          </div>
        ) : (
          <div className="team-grid">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className="team-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="team-photo-container">
                  {leader.photo_url ? (
                    <img 
                      src={leader.photo_url} 
                      alt={leader.name}
                      className="team-photo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="team-avatar"
                    style={{ display: leader.photo_url ? 'none' : 'flex' }}
                  >
                    {leader.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="team-info">
                  <h3>{leader.name}</h3>
                  <p className="team-role">{leader.role}</p>
                  {leader.bio && (
                    <p className="team-bio">{leader.bio}</p>
                  )}
                  
                  <div className="team-contact">
                    {leader.email && (
                      <a 
                        href={`mailto:${leader.email}`}
                        className="contact-link"
                        title={`Email ${leader.name}`}
                      >
                        ✉️ Contact
                      </a>
                    )}
                    {leader.linkedin && (
                      <a 
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        title={`${leader.name} on LinkedIn`}
                      >
                        💼 LinkedIn
                      </a>
                    )}
                    {leader.twitter && (
                      <a 
                        href={leader.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        title={`${leader.name} on Twitter`}
                      >
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamLeaders;
