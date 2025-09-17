import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';

const TimeLine = () => {
  const [visibleEvents, setVisibleEvents] = useState([]);

  const events = [
    { 
      id: 1, 
      title: "Registration Opens", 
      date: "Oct 1, 2025", 
      time: "09:00 AM", 
      description: "Registration portal goes live for all participants",
      category: "non-technical",
      icon: "📝"
    },
    { 
      id: 2, 
      title: "Code Quest", 
      date: "Oct 15, 2025", 
      time: "10:00 AM", 
      description: "Competitive programming challenge with algorithmic problems",
      category: "technical",
      icon: "💻"
    },
    { 
      id: 3, 
      title: "Web Wizard Competition", 
      date: "Oct 15, 2025", 
      time: "11:30 AM", 
      description: "Full-stack web development competition",
      category: "technical",
      icon: "🌐"
    },
    { 
      id: 4, 
      title: "Innovation Pitch", 
      date: "Oct 15, 2025", 
      time: "02:00 PM", 
      description: "Business idea presentation competition",
      category: "non-technical",
      icon: "🚀"
    },
    { 
      id: 5, 
      title: "AI Innovation Challenge", 
      date: "Oct 15, 2025", 
      time: "03:30 PM", 
      description: "Machine learning and AI project showcase",
      category: "technical",
      icon: "🤖"
    },
    { 
      id: 6, 
      title: "Creative Design Studio", 
      date: "Oct 15, 2025", 
      time: "04:30 PM", 
      description: "UI/UX design competition showcasing creativity",
      category: "non-technical",
      icon: "🎨"
    },
    { 
      id: 7, 
      title: "Circuit Master", 
      date: "Oct 16, 2025", 
      time: "09:30 AM", 
      description: "Hardware design and embedded systems challenge",
      category: "technical",
      icon: "⚡"
    },
    { 
      id: 8, 
      title: "Tech Talk Marathon", 
      date: "Oct 16, 2025", 
      time: "11:00 AM", 
      description: "Public speaking competition on technology trends",
      category: "non-technical",
      icon: "🎤"
    },
    { 
      id: 9, 
      title: "Data Analytics Pro", 
      date: "Oct 16, 2025", 
      time: "01:00 PM", 
      description: "Big data analysis and visualization competition",
      category: "technical",
      icon: "📊"
    },
    { 
      id: 10, 
      title: "Case Study Challenge", 
      date: "Oct 16, 2025", 
      time: "02:30 PM", 
      description: "Business case analysis and strategic problem-solving",
      category: "non-technical",
      icon: "📋"
    },
    { 
      id: 11, 
      title: "Cyber Security Challenge", 
      date: "Oct 16, 2025", 
      time: "04:00 PM", 
      description: "Ethical hacking and cybersecurity CTF challenges",
      category: "technical",
      icon: "🔒"
    },
    { 
      id: 12, 
      title: "Awards & Closing Ceremony", 
      date: "Oct 16, 2025", 
      time: "06:00 PM", 
      description: "Grand finale with awards distribution and networking",
      category: "non-technical",
      icon: "🏆"
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = parseInt(entry.target.dataset.eventId);
            setVisibleEvents(prev => [...new Set([...prev, eventId])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section">
      <div className="container">
        <h2 className="section-title">Zehinex 25 Event Timeline</h2>
        <p className="section-subtitle">Technical events on the right, Non-technical events on the left</p>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const side = isLeft ? 'left' : 'right';
            
            return (
              <div 
                key={event.id}
                className={`timeline-item ${side} ${visibleEvents.includes(event.id) ? 'visible' : ''} ${event.category === 'technical' ? 'tech' : 'non-tech'}`}
                data-event-id={event.id}
              >
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="timeline-marker">
                      <span className="timeline-icon">{event.icon}</span>
                    </div>
                    <div className="card-header">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-meta">
                        <span className="event-date">{event.date}</span>
                        <span className="event-time">{event.time}</span>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
