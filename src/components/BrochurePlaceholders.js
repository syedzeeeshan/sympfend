import React from 'react';
import '../styles/BrochurePlaceholders.css';

const BrochurePlaceholders = () => {
  const placeholders = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Brochure ${i + 1}`,
    status: 'Coming Soon'
  }));

  return (
    <section className="brochures-section">
      <div className="container">
        <h2 className="section-title">Event Brochures</h2>
        <div className="brochures-grid">
          {placeholders.map((item, index) => (
            <div 
              key={item.id} 
              className="brochure-placeholder"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="brochure-icon">📄</div>
              <div className="brochure-number">{item.id}</div>
              <div className="brochure-title">{item.title}</div>
              <div className="brochure-status">{item.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrochurePlaceholders;
