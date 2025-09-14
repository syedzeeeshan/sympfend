import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timeline.css';

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [progressHeight, setProgressHeight] = useState(0);
  const timelineRef = useRef();

  const events = [
    { id: 1, time: "09:00 AM", label: "Opening Ceremony", description: "Welcome & Registration", icon: "🎊", color: "#ff4444" },
    { id: 2, time: "09:30 AM", label: "Keynote Address", description: "Future of Technology", icon: "🎤", color: "#ff6600" },
    { id: 3, time: "10:00 AM", label: "AI Workshop", description: "Hands-on AI Development", icon: "🤖", color: "#ff8800" },
    { id: 4, time: "11:00 AM", label: "Coffee Break", description: "Networking & Refreshments", icon: "☕", color: "#ffaa00" },
    { id: 5, time: "11:30 AM", label: "Blockchain Summit", description: "Decentralized Technologies", icon: "⛓️", color: "#ffcc00" },
    { id: 6, time: "12:30 PM", label: "Lunch Break", description: "Networking Lunch", icon: "🍽️", color: "#ccff00" },
    { id: 7, time: "01:30 PM", label: "Web3 Workshop", description: "Next-gen Development", icon: "🌐", color: "#88ff00" },
    { id: 8, time: "02:30 PM", label: "Startup Pitches", description: "Entrepreneur Showcase", icon: "🚀", color: "#44ff00" },
    { id: 9, time: "03:30 PM", label: "Panel Discussion", description: "Industry Leaders", icon: "👥", color: "#00ff44" },
    { id: 10, time: "04:30 PM", label: "Awards Ceremony", description: "Recognition & Prizes", icon: "🏆", color: "#00ff88" },
    { id: 11, time: "05:00 PM", label: "Closing Remarks", description: "Thank You & Next Steps", icon: "🎯", color: "#00ffcc" },
    { id: 12, time: "05:30 PM", label: "After Party", description: "Celebration & Music", icon: "🎉", color: "#ff4444" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
            
            // Update progress bar
            const progress = ((index + 1) / events.length) * 100;
            setProgressHeight(Math.max(progress, progressHeight));
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [events.length, progressHeight]);

  return (
    <section className="timeline-section" ref={timelineRef}>
      <div className="container">
        <h2 className="timeline-title">Event Timeline</h2>
        <p className="timeline-description">A full day of innovation, learning, and networking</p>
        
        <div className="timeline">
          <div className="timeline-line"></div>
          <div 
            className="timeline-progress" 
            style={{ height: `${progressHeight}%` }}
          ></div>
          
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${
                visibleItems.has(index) ? 'animate-in' : ''
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--event-color': event.color
              }}
            >
              <div className="timeline-dot" style={{ backgroundColor: event.color }}>
                <span className="timeline-icon">{event.icon}</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-time" style={{ color: event.color }}>
                  {event.time}
                </div>
                <div className="timeline-label">{event.label}</div>
                <div className="timeline-description">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
