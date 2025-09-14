import React, { useState } from 'react';
import '../styles/CircularBrochureGallery.css';

const CircularBrochureGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // 12 Events: 6 Technical + 6 Non-Technical
  const events = [
    // Technical Events (1-6)
    { 
      id: 1, 
      title: "AI Workshop", 
      type: "technical", 
      icon: "🤖", 
      description: "Hands-on AI development",
      page1: {
        title: "AI Fundamentals & Machine Learning",
        content: "Discover the core concepts of artificial intelligence, explore different types of machine learning algorithms, and understand how AI is transforming industries. Learn about neural networks, deep learning, and practical applications in real-world scenarios.",
        image: "🧠"
      },
      page2: {
        title: "Build Your First AI Model", 
        content: "Step-by-step hands-on workshop to create, train, and deploy your first AI model using popular frameworks like TensorFlow and PyTorch. Includes practical coding exercises and model optimization techniques.",
        image: "⚙️"
      }
    },
    { 
      id: 2, 
      title: "Blockchain Summit", 
      type: "technical", 
      icon: "⛓️", 
      description: "Decentralized technology",
      page1: {
        title: "Blockchain Architecture & Consensus",
        content: "Understanding distributed ledgers, consensus mechanisms, and the fundamental principles that make blockchain technology revolutionary. Explore different blockchain networks and their unique characteristics.",
        image: "🏗️"
      },
      page2: {
        title: "Smart Contracts & DeFi Applications",
        content: "Dive into smart contract development, decentralized finance protocols, and building secure applications on blockchain networks. Learn Solidity programming and best practices.",
        image: "💰"
      }
    },
    { 
      id: 3, 
      title: "Web3 Development", 
      type: "technical", 
      icon: "🌐", 
      description: "Next-gen web development",
      page1: {
        title: "Web3 Technologies & Framework",
        content: "Introduction to decentralized web technologies, IPFS, MetaMask integration, and the paradigm shift from Web2 to Web3. Explore decentralized storage and identity management.",
        image: "🔗"
      },
      page2: {
        title: "Building Decentralized Applications",
        content: "Hands-on workshop for creating decentralized applications using React, Web3.js, and modern development tools. Build a complete dApp from scratch.",
        image: "🛠️"
      }
    },
    { 
      id: 4, 
      title: "Cybersecurity Lab", 
      type: "technical", 
      icon: "🔐", 
      description: "Security best practices",
      page1: {
        title: "Threat Analysis & Prevention",
        content: "Learn to identify, analyze, and prevent common cyber threats including malware, phishing, and social engineering attacks. Understanding security frameworks and risk assessment.",
        image: "🛡️"
      },
      page2: {
        title: "Penetration Testing Techniques",
        content: "Practical penetration testing methodologies, vulnerability assessment, and ethical hacking techniques. Hands-on lab exercises with security tools.",
        image: "🔍"
      }
    },
    { 
      id: 5, 
      title: "Cloud Computing", 
      type: "technical", 
      icon: "☁️", 
      description: "Scalable infrastructure",
      page1: {
        title: "Cloud Architecture Patterns",
        content: "Design patterns for scalable cloud infrastructure, microservices architecture, and best practices for cloud-native applications. AWS, Azure, and Google Cloud platforms.",
        image: "🏛️"
      },
      page2: {
        title: "DevOps & Container Orchestration",
        content: "Container orchestration with Kubernetes, CI/CD pipelines, and implementing DevOps practices in cloud environments. Docker, Jenkins, and automation tools.",
        image: "🚀"
      }
    },
    { 
      id: 6, 
      title: "Data Science", 
      type: "technical", 
      icon: "📊", 
      description: "Analytics and insights",
      page1: {
        title: "Data Analysis Methodologies",
        content: "Statistical analysis, data visualization techniques, and using Python/R for extracting meaningful insights from complex datasets. Pandas, NumPy, and Matplotlib.",
        image: "📈"
      },
      page2: {
        title: "Machine Learning Applications",
        content: "Implementing machine learning algorithms for predictive analytics, classification, and clustering. Real-world case studies and project implementation.",
        image: "🎯"
      }
    },
    
    // Non-Technical Events (7-12)
    { 
      id: 7, 
      title: "Startup Pitch", 
      type: "non-technical", 
      icon: "🚀", 
      description: "Entrepreneur showcase",
      page1: {
        title: "Business Model Innovation",
        content: "Learn how to develop innovative business models, identify market opportunities, and create value propositions that resonate with customers and investors.",
        image: "💡"
      },
      page2: {
        title: "Investor Presentation Skills",
        content: "Master the art of pitching to investors, crafting compelling presentations, and telling your startup story effectively. Learn what investors look for.",
        image: "🎤"
      }
    },
    { 
      id: 8, 
      title: "Leadership Talk", 
      type: "non-technical", 
      icon: "👑", 
      description: "Industry insights",
      page1: {
        title: "Leadership in Tech Industry",
        content: "Insights from industry leaders on navigating the tech landscape, making strategic decisions, and driving innovation in fast-paced environments.",
        image: "🌟"
      },
      page2: {
        title: "Building High-Performing Teams",
        content: "Learn how to recruit, motivate, and retain top talent. Understand team dynamics, communication strategies, and creating a culture of innovation.",
        image: "🤝"
      }
    },
    { 
      id: 9, 
      title: "Design Thinking", 
      type: "non-technical", 
      icon: "🎨", 
      description: "Creative problem solving",
      page1: {
        title: "User-Centered Design Process",
        content: "Explore the design thinking methodology, understand user needs, and learn how to approach problem-solving from a human-centered perspective.",
        image: "👥"
      },
      page2: {
        title: "Prototyping & Iteration",
        content: "Hands-on workshop on rapid prototyping, user testing, and iterative design. Learn to fail fast and improve continuously.",
        image: "🔄"
      }
    },
    { 
      id: 10, 
      title: "Career Growth", 
      type: "non-technical", 
      icon: "📈", 
      description: "Professional development",
      page1: {
        title: "Strategic Career Planning",
        content: "Develop a strategic approach to career advancement, identify growth opportunities, and create a roadmap for professional success in the tech industry.",
        image: "🗺️"
      },
      page2: {
        title: "Skill Development Roadmap",
        content: "Learn how to identify skill gaps, create learning plans, and stay relevant in the rapidly evolving tech landscape. Continuous learning strategies.",
        image: "🎓"
      }
    },
    { 
      id: 11, 
      title: "Networking Hub", 
      type: "non-technical", 
      icon: "🤝", 
      description: "Connect and collaborate",
      page1: {
        title: "Building Professional Networks",
        content: "Master the art of networking, building meaningful professional relationships, and leveraging your network for career and business opportunities.",
        image: "🌐"
      },
      page2: {
        title: "Collaboration Opportunities",
        content: "Explore partnership opportunities, learn how to identify potential collaborators, and create mutually beneficial professional relationships.",
        image: "🤜🤛"
      }
    },
    { 
      id: 12, 
      title: "Innovation Panel", 
      type: "non-technical", 
      icon: "💡", 
      description: "Future perspectives",
      page1: {
        title: "Technology Trends & Insights",
        content: "Explore emerging technology trends, future predictions, and how they will impact industries and society. Insights from thought leaders and innovators.",
        image: "🔮"
      },
      page2: {
        title: "Industry Transformation",
        content: "Understanding how digital transformation is reshaping industries, creating new opportunities, and the skills needed for the future workforce.",
        image: "🌅"
      }
    }
  ];

  const openEvent = (event) => {
    setSelectedEvent(event);
    setIsFlipped(false);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Separate technical and non-technical events
  const technicalEvents = events.filter(event => event.type === 'technical');
  const nonTechnicalEvents = events.filter(event => event.type === 'non-technical');

  return (
    <section className="circular-brochure-gallery">
      <div className="container">
        <h2>Event Highlights</h2>
        <p className="section-description">
          Choose from technical workshops and engaging non-technical sessions
        </p>
        
        {/* Technical Events Section */}
        <div className="event-category">
          <h3 className="category-title technical">
            <span className="category-icon">🔧</span>
            Technical Events
          </h3>
          <div className="circular-grid">
            {technicalEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="circular-item technical"
                onClick={() => openEvent(event)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="circular-button">
                  <div className="event-content">
                    <div className="event-icon">{event.icon}</div>
                    <div className="event-number">{event.id}</div>
                  </div>
                </div>
                <div className="item-label">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Technical Events Section */}
        <div className="event-category">
          <h3 className="category-title non-technical">
            <span className="category-icon">🎯</span>
            Non-Technical Events
          </h3>
          <div className="circular-grid">
            {nonTechnicalEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="circular-item non-technical"
                onClick={() => openEvent(event)}
                style={{ animationDelay: `${(index + 6) * 0.15}s` }}
              >
                <div className="circular-button">
                  <div className="event-content">
                    <div className="event-icon">{event.icon}</div>
                    <div className="event-number">{event.id}</div>
                  </div>
                </div>
                <div className="item-label">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Card Flip Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal} title="Close">×</button>
            
            <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
              <div className="flip-card-inner">
                {/* Front Page */}
                <div className="flip-card-front" onClick={flipCard}>
                  <div className="page-header">
                    <div className="page-image">{selectedEvent.page1.image}</div>
                    <h3>{selectedEvent.page1.title}</h3>
                    <div className="page-indicator">Page 1 of 2</div>
                  </div>
                  <div className="page-content">
                    <p>{selectedEvent.page1.content}</p>
                  </div>
                  <div className="flip-indicator">
                    <span className="click-hint">Click to flip →</span>
                  </div>
                </div>
                
                {/* Back Page */}
                <div className="flip-card-back" onClick={flipCard}>
                  <div className="page-header">
                    <div className="page-image">{selectedEvent.page2.image}</div>
                    <h3>{selectedEvent.page2.title}</h3>
                    <div className="page-indicator">Page 2 of 2</div>
                  </div>
                  <div className="page-content">
                    <p>{selectedEvent.page2.content}</p>
                  </div>
                  <div className="flip-indicator">
                    <span className="click-hint">← Click to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CircularBrochureGallery;
