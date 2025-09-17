import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';

const TimeLine = () => {
  const [visibleEvents, setVisibleEvents] = useState([]);

  const events = [
    { 
      id: 1, 
      title: "Paper Presentation", 
      date: "Sep 07, 2025", 
      time: "Full Day", 
      description: "Participants present research papers or innovative ideas in front of judges and peers. Venue: Hall",
      category: "technical",
      icon: ""
    },
    { 
      id: 2, 
      title: "Project Expo", 
      date: "Sep 07, 2025", 
      time: "Full Day", 
      description: "A showcase where participants exhibit their innovative projects, prototypes, or solutions to real-world problems. Venue: Hall",
      category: "technical",
      icon: "💻"
    },
    { 
      id: 3, 
      title: "Web Vibe", 
      date: "Sep 07, 2025", 
      time: "Morning (2 hrs)", 
      description: "A web development competition where participants build creative and functional web pages or apps in a short time. Venue: CC1",
      category: "technical",
      icon: "🌐"
    },
    { 
      id: 4, 
      title: "Meme Loader", 
      date: "Sep 07, 2025", 
      time: "Morning (1 hr)", 
      description: "A light-hearted event where participants create funny, clever memes on given topics to entertain the audience. Venue: CC2",
      category: "non-technical",
      icon: "😂"
    },
    { 
      id: 5, 
      title: "Quiz Tronic", 
      date: "Sep 07, 2025", 
      time: "Morning (1 hr)", 
      description: "A technical quiz focusing on programming, electronics, computer science, and problem-solving. Venue: CSE-B 1st Floor",
      category: "technical",
      icon: "❓"
    },
    { 
      id: 6, 
      title: "Creative Canva", 
      date: "Sep 07, 2025", 
      time: "Morning (1 hr)", 
      description: "A design event where participants create stunning posters, digital flyers, or graphics using Canva or similar tools. Venue: CC1",
      category: "non-technical",
      icon: "🎨"
    },
    { 
      id: 7, 
      title: "Murder Mystery", 
      date: "Sep 09, 2025", 
      time: "Morning (1 hr)", 
      description: "A thrilling event where participants work in teams to solve a fictional crime using clues, logic, and deduction. Venue: CSE-A 1st Floor",
      category: "non-technical",
      icon: "🕵️"
    },
    { 
      id: 8, 
      title: "E-Sports", 
      date: "Sep 09, 2025", 
      time: "Afternoon (2 hrs)", 
      description: "Competitive gaming event featuring popular multiplayer video games. Teams or individuals compete for the highest scores. Venue: CSE-A 3rd Floor",
      category: "technical",
      icon: "🎮"
    },
    { 
      id: 9, 
      title: "Quiz Buzz", 
      date: "Sep 09, 2025", 
      time: "Afternoon (2.5 hrs)", 
      description: "A fun and fast-paced quiz competition testing participants’ knowledge on general topics, tech, and current affairs. Venue: CSE-A 1st Floor",
      category: "technical",
      icon: "🔔"
    },
    { 
      id: 10, 
      title: "Pixel Cutz", 
      date: "Sep 09, 2025", 
      time: "Afternoon (1 hr)", 
      description: "A digital art or pixel art creation challenge where participants design creative visuals using limited pixels or tools. Venue: CC2",
      category: "technical",
      icon: "🖼️"
    },
    { 
      id: 11, 
      title: "Treasure Hunt", 
      date: "Sep 09, 2025", 
      time: "Afternoon (2 hrs)", 
      description: "A campus-wide puzzle-solving game where teams follow clues, decode riddles, and race to find the hidden treasure. Venue: Main Block",
      category: "non-technical",
      icon: "🗝️"
    },
    { 
      id: 12, 
      title: "D.2.D. (Dialogue to  Delivery )", 
      date: "Sep 09, 2025", 
      time: "Afternoon (2 hrs)", 
      description: "exciting party game that challenges player to communicate without hearing,  Venue: CSE-B 1st Floor",
      category: "technical",
      icon: "💻"
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
