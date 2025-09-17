// src/components/LandingPage.jsx
import React from 'react';
import ParticlesBackground from './ParticlesBackground';
import CircularBrochureGallery from './CircularBrochureGallery';
import TimeLine from './TimeLine';
import TeamPlaceholders from './TeamPlaceholders';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const handleRegistration = () => {
    const formUrl = process.env.REACT_APP_GOOGLE_FORM_URL || 'https://forms.gle/Zxm2tDGrqvDej2Kq5';
    window.open(formUrl, '_blank');
  };

  return (
    <div className="landing-page with-header">
      {/* Custom Interactive Particles Background */}
      <ParticlesBackground />

      {/* CSE Department Header */}
      <header className="department-header">
        <div className="container">
          <div className="department-info">
            <span className="department-name">Department of Computer Science & Engineering</span>
            <span className="institution-name">presents</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Centered ZEHINX 25 */}
      <section className="hero-main">
        <div className="hero-content">
          <div className="department-badge">
            <span className="dept-text">Computer Science & Engineering</span>
            <span className="presents-text">Presents</span>
          </div>
          
          <h1 className="main-title">ZEHINEX</h1>
          <h2 className="year-title">25</h2>
          <div className="hero-tagline">Innovation • Technology • Future</div>
          <div className="status-indicator">
            <div className="status-dot connected"></div>
            <span className="status-text">Live Now</span>
          </div>
        </div>
         <button 
            className="scroll-to-register-btn"
     onClick={() => {
    const registerSection = document.getElementById('register-section');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Go to Register
</button>
  
      </section>

      {/* Event Highlights */}
      <CircularBrochureGallery />

      {/* Timeline */}
      <TimeLine />

      {/* Team Section */}
      <TeamPlaceholders />

      {/* Registration Section */}
      <section id="registratio-section" className="registration-section">
        <div className="container">
          <h2>Join Zehinex Symposium 2025</h2>
          <p>Register now to secure your spot at the premier tech event</p>
          <button 
            className="register-btn"
            onClick={handleRegistration}
          >
            Register Now
          </button>
          <p className="registration-note">
            Registration form will open in a new tab
          </p>
        </div>
      </section>

      {/* Developer Credit */}
      <section className="developer-credit">
        <div className="developer-container">
          <p className="developed-by">
            Developed by <span className="developer-name">Syed Asadullah Zeeshan</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
