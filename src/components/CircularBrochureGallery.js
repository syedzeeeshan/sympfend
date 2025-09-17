import React, { useState } from 'react';
import '../styles/CircularBrochureGallery.css';

const CircularBrochureGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const events = [
  // Technical Events
  { 
    id: 1, 
    title: "Paper Presentation", 
    category: "technical",
    description: "Participants present research papers or innovative ideas in front of judges and peers.",
    details: "Date: Sep 07, 2025 | Time: Full Day | Venue: Hall",
    frontImage: "/images/tech1_front.jpeg", 
    backImage: "/images/tech1_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 2, 
    title: "Project Expo", 
    category: "technical",
    description: "A showcase where participants exhibit their innovative projects, prototypes, or solutions to real-world problems.",
    details: "Date: Sep 07, 2025 | Time: Full Day | Venue: Hall",
    frontImage: "/images/tech2_front.jpeg", 
    backImage: "/images/tech2_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 3, 
    title: "Web Vibe", 
    category: "technical",
    description: "Web development competition where participants build creative and functional web pages or apps in a short time.",
    details: "Date: Sep 07, 2025 | Time: Morning (2 hrs) | Venue: CC1",
    frontImage: "/images/tech3_front.jpeg", 
    backImage: "/images/tech3_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 4, 
    title: "Quiz Tronic", 
    category: "technical",
    description: "Technical quiz focusing on programming, electronics, computer science, and problem-solving.",
    details: "Date: Sep 07, 2025 | Time: Morning (1 hr) | Venue: CSE-B 1st Floor",
    frontImage: "/images/tech4_front.jpeg", 
    backImage: "/images/tech4_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 5, 
    title: "E-Sports", 
    category: "non-technical",
    description: "Competitive gaming event featuring popular multiplayer video games. Teams or individuals compete for the highest scores.",
    details: "Date: Sep 09, 2025 | Time: Afternoon (2 hrs) | Venue: CSE-A 3rd Floor",
    frontImage: "/images/tech5_front.jpeg", 
    backImage: "/images/tech5_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 6, 
    title: "Quiz Buzz", 
    category: "non-technical",
    description: "Fun and fast-paced quiz competition testing participants’ knowledge on general topics, tech, and current affairs.",
    details: "Date: Sep 09, 2025 | Time: Afternoon (2.5 hrs) | Venue: CSE-A 1st Floor",
    frontImage: "/images/tech6_front.jpeg", 
    backImage: "/images/tech6_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 7, 
    title: "Pixel Cutz", 
    category: "non-technical",
    description: "Digital art or pixel art creation challenge where participants design creative visuals using limited pixels or tools.",
    details: "Date: Sep 09, 2025 | Time: Afternoon (1 hr) | Venue: CC2",
    frontImage: "/images/tech7_front.jpeg", 
    backImage: "/images/tech7_back.jpeg",
    color: "#FFD700"
  },
  { 
    id: 8, 
    title: "D.2. D. (Dialogue to Delivery)", 
    category: "non-technical",
    description: "A execiting party game that challenges player to communicate without hearing .",
    details: "Date: Sep 09, 2025 | Time: Afternoon (2 hrs) | Venue: CSE-B 1st Floor",
    frontImage: "/images/tech8_front.jpeg", 
    backImage: "/images/tech8_back.jpeg",
    color: "#FFD700"
  },

  // Non-Technical Events
  { 
    id: 9, 
    title: "Meme Coder", 
    category: "technical",
    description: "A light-hearted event where participants create funny, clever memes on given topics to entertain the audience.",
    details: "Date: Sep 07, 2025 | Time: Morning (1 hr) | Venue: CC2",
    frontImage: "/images/nontech1_front.jpeg", 
    backImage: "/images/nontech1_back.jpeg",
    color: "#32CD32"
  },
  { 
    id: 10, 
    title: "Creative Canva", 
    category: "technical",
    description: "Design event where participants create stunning posters, digital flyers, or graphics using Canva or similar tools.",
    details: "Date: Sep 07, 2025 | Time: Morning (1 hr) | Venue: CC1",
    frontImage: "/images/nontech2_front.jpeg", 
    backImage: "/images/nontech2_back.jpeg",
    color: "#32CD32"
  },
  { 
    id: 11, 
    title: "Murder Mystery", 
    category: "non-technical",
    description: "Thrilling event where participants work in teams to solve a fictional crime using clues, logic, and deduction.",
    details: "Date: Sep 09, 2025 | Time: Morning (1 hr) | Venue: CSE-A 1st Floor",
    frontImage: "/images/nontech3_front.jpeg", 
    backImage: "/images/nontech3_back.jpeg",
    color: "#32CD32"
  },
  { 
    id: 12, 
    title: "Treasure Hunt", 
    category: "non-technical",
    description: "Campus-wide puzzle-solving game where teams follow clues, decode riddles, and race to find the hidden treasure.",
    details: "Date: Sep 09, 2025 | Time: Afternoon (2 hrs) | Venue: Main Block",
    frontImage: "/images/nontech4_front.jpeg", 
    backImage: "/images/nontech4_back.jpeg",
    color: "#32CD32"
  }
];


  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setFlipped(false);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const technicalEvents = events.filter(e => e.category === "technical");
  const nonTechnicalEvents = events.filter(e => e.category === "non-technical");

  return (
    <section className="brochure-gallery">
      <div className="container">
        <h2 className="section-title">Event Highlights</h2>
        <p className="section-subtitle">Click on any event card to view detailed brochure</p>
        
        {/* Technical Events Section */}
        <div className="events-category">
          <h3 className="category-title technical">🔧 Technical Events</h3>
          <div className="events-grid">
            {technicalEvents.map((event) => (
              <div 
                key={event.id} 
                className="event-card technical"
                onClick={() => handleCardClick(event)}
              >
                <div className="event-image">
                  <img
                    src={event.frontImage}
                    alt={`${event.title} Preview`}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/280x200/${event.color.slice(1)}/1a1a1a?text=${event.title.replace(/\s+/g, '+')}`;
                    }}
                  />
                  <div className="event-overlay">
                    <span>Click to View Details</span>
                  </div>
                </div>
                <div className="event-info">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-short-desc">{event.description.substring(0, 60)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Technical Events Section */}
        <div className="events-category">
          <h3 className="category-title non-technical">🎨 Non-Technical Events</h3>
          <div className="events-grid">
            {nonTechnicalEvents.map((event) => (
              <div 
                key={event.id} 
                className="event-card non-technical"
                onClick={() => handleCardClick(event)}
              >
                <div className="event-image">
                  <img
                    src={event.frontImage}
                    alt={`${event.title} Preview`}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/280x200/${event.color.slice(1)}/1a1a1a?text=${event.title.replace(/\s+/g, '+')}`;
                    }}
                  />
                  <div className="event-overlay">
                    <span>Click to View Details</span>
                  </div>
                </div>
                <div className="event-info">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-short-desc">{event.description.substring(0, 60)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Detailed View */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleModalClose}>
              ✕
            </button>
            
            <div className="brochure-viewer">
              <h3 className="modal-title">{selectedEvent.title}</h3>
              
              <div className="brochure-container">
                <div className={`brochure-card-large ${flipped ? 'flipped' : ''}`}>
                  <div className="brochure-front-large">
                    <img
                      src={selectedEvent.frontImage}
                      alt={`${selectedEvent.title} Front Page`}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x500/${selectedEvent.color.slice(1)}/1a1a1a?text=${selectedEvent.title.replace(/\s+/g, '+')}+Front`;
                      }}
                    />
                  </div>
                  <div className="brochure-back-large">
                    <img
                      src={selectedEvent.backImage}
                      alt={`${selectedEvent.title} Back Page`}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x500/${selectedEvent.color.slice(1)}/1a1a1a?text=${selectedEvent.title.replace(/\s+/g, '+')}+Back`;
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="event-details">
                <p className="event-description">{selectedEvent.description}</p>
                <p className="event-details-info">{selectedEvent.details}</p>
                
                <button className="flip-btn" onClick={handleFlip}>
                  {flipped ? '📄 View Front Page' : '📑 View Back Page'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CircularBrochureGallery;
