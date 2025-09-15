import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import CircularBrochureGallery from './CircularBrochureGallery';
import Timeline from './TimeLine';
import TeamPlaceholders from './TeamPlaceholders';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkBackendConnection = useCallback(async () => {
    try {
      const response = await apiService.checkHealth();
      setApiStatus(response.data);
    } catch (error) {
      setApiStatus({ status: 'error', message: 'Connection failed' });
    } finally {
      setLoading(false);
    }
  }, []);

  const initGoldParticles = useCallback(() => {
    // Remove any existing particles
    const existingCanvas = document.querySelector('#particles-js canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#FFD700', '#FFA500', '#FF8C00', '#FFAA33']
            },
            shape: {
              type: ['circle', 'triangle'],
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 20,
                size_min: 0.5,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 180,
              color: '#FFD700',
              opacity: 0.6,
              width: 2
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'bubble'
              },
              onclick: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              bubble: {
                distance: 250,
                size: 8,
                duration: 2,
                opacity: 1,
                speed: 3
              },
              repulse: {
                distance: 300,
                duration: 0.4
              }
            }
          },
          retina_detect: true
        });
        
        console.log('🎉 Particles initialized successfully!');
      }
    };
    
    if (!document.querySelector('script[src*="particles.min.js"]')) {
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    checkBackendConnection();
    
    // Delay particle initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      initGoldParticles();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [checkBackendConnection, initGoldParticles]);

  return (
    <div className="landing-page">
      {/* Particles Container */}
      <div id="particles-js" className="particles-container"></div>

      {/* Hero Section */}
      <section className="hero-main">
        <div className="hero-content">
          <h1 className="main-title">ZEHINIX</h1>
          <h2 className="year-title">25</h2>
          <div className="hero-tagline">Innovation • Technology • Future</div>
          <div className="status-indicator">
            {loading ? (
              <div className="status-loading">●</div>
            ) : (
              <div className={`status-dot ${apiStatus?.status === 'ok' ? 'connected' : 'error'}`}></div>
            )}
          </div>
        </div>
      </section>

      <CircularBrochureGallery />
      <Timeline />
      <TeamPlaceholders />

      <section className="registration-section">
        <div className="container">
          <h2>Join Zehinix Symposium 2025</h2>
          <p>Register now to secure your spot at the premier tech event</p>
          <button 
            className="register-btn"
            onClick={() => navigate('/register')}
          >
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
