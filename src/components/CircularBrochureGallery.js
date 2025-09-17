import React, { useState } from 'react';
import '../styles/CircularBrochureGallery.css';

const CircularBrochureGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const events = [
  // Technical Events
  { 
    id: 1, 
    title: "Code Hunter", 
    category: "technical",
    description: "Competitive coding event focusing on logical problem-solving and efficient algorithms.",
    details: "Duration: 3 hours | Team Size: 1-2 | Prize Pool: ₹25,000",
    frontImage: "/images/tech1_front.jpg", 
    backImage: "/images/tech1_back.jpg",
    color: "#FFD700"
  },
  { 
    id: 2, 
    title: "Hack Sprint", 
    category: "technical",
    description: "Hackathon where participants build innovative solutions in a limited time frame.",
    details: "Duration: 24 hours | Team Size: 2-4 | Prize Pool: ₹30,000",
    frontImage: "/images/tech2_front.jpg", 
    backImage: "/images/tech2_back.jpg",
    color: "#FFD700"
  },
  { 
    id: 3, 
    title: "AI Bot Wars", 
    category: "technical",
    description: "Competition where teams create AI-powered bots to solve challenges or battle each other.",
    details: "Duration: 6 hours | Team Size: 2-4 | Prize Pool: ₹40,000",
    frontImage: "/images/tech3_front.jpg", 
    backImage: "/images/tech3_back.jpg",
    color: "#FFD700"
  },
  { 
    id: 4, 
    title: "Circuit Breakers", 
    category: "technical",
    description: "Embedded systems and circuit design challenge for electronics enthusiasts.",
    details: "Duration: 5 hours | Team Size: 2-3 | Prize Pool: ₹35,000",
    frontImage: "/images/tech4_front.jpg", 
    backImage: "/images/tech4_back.jpg",
    color: "#FFD700"
  },
  { 
    id: 5, 
    title: "Data Hunt", 
    category: "technical",
    description: "Data analytics and visualization contest with real-world datasets.",
    details: "Duration: 4 hours | Team Size: 1-3 | Prize Pool: ₹28,000",
    frontImage: "/images/tech5_front.jpg", 
    backImage: "/images/tech5_back.jpg",
    color: "#FFD700"
  },
  { 
    id: 6, 
    title: "Capture The Flag", 
    category: "technical",
    description: "Cybersecurity event with real-world hacking challenges and puzzles.",
    details: "Duration: 8 hours | Team Size: 1-4 | Prize Pool: ₹45,000",
    frontImage: "/images/tech6_front.jpg", 
    backImage: "/images/tech6_back.jpg",
    color: "#FFD700"
  },
  
  // Non-Technical Events
  { 
    id: 7, 
    title: "Idea Storm", 
    category: "non-technical",
    description: "Pitch your innovative ideas and present business solutions creatively.",
    details: "Duration: 2 hours | Team Size: 2-5 | Prize Pool: ₹20,000",
    frontImage: "/images/nontech1_front.jpg", 
    backImage: "/images/nontech1_back.jpg",
    color: "#32CD32"
  },
  { 
    id: 8, 
    title: "Design-A-Thon", 
    category: "non-technical",
    description: "Creative UI/UX design event focusing on usability and aesthetics.",
    details: "Duration: 3 hours | Team Size: 1-2 | Prize Pool: ₹22,000",
    frontImage: "/images/nontech2_front.jpg", 
    backImage: "/images/nontech2_back.jpg",
    color: "#32CD32"
  },
  { 
    id: 9, 
    title: "Tech Debate", 
    category: "non-technical",
    description: "Debate on trending technology topics and their impact on society.",
    details: "Duration: 1 hour | Team Size: 1 | Prize Pool: ₹15,000",
    frontImage: "/images/nontech3_front.jpg", 
    backImage: "/images/nontech3_back.jpg",
    color: "#32CD32"
  },
  { 
    id: 10, 
    title: "Biz Case Challenge", 
    category: "non-technical",
    description: "Solve real-world business case studies and propose strategic solutions.",
    details: "Duration: 4 hours | Team Size: 3-4 | Prize Pool: ₹25,000",
    frontImage: "/images/nontech4_front.jpg", 
    backImage: "/images/nontech4_back.jpg",
    color: "#32CD32"
  },
  { 
    id: 11, 
    title: "Market Maestro", 
    category: "non-technical",
    description: "Digital marketing strategy competition with live campaign creation.",
    details: "Duration: 3 hours | Team Size: 2-3 | Prize Pool: ₹18,000",
    frontImage: "/images/nontech5_front.jpg", 
    backImage: "/images/nontech5_back.jpg",
    color: "#32CD32"
  },
  { 
    id: 12, 
    title: "Shutter Shots", 
    category: "non-technical",
    description: "Photography contest capturing creativity and technology themes.",
    details: "Duration: 2 hours | Team Size: 1 | Prize Pool: ₹12,000",
    frontImage: "/images/nontech6_front.jpg", 
    backImage: "/images/nontech6_back.jpg",
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
