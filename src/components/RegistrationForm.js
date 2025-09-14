import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    college: '',
    department: ''
  });
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 12 Events with sub-options
  const events = [
    { id: 1, name: "AI Workshop", type: "Technical", subOptions: ["Beginner Level", "Advanced Level"] },
    { id: 2, name: "Blockchain Summit", type: "Technical", subOptions: ["Theory Session", "Hands-on Coding"] },
    { id: 3, name: "Web3 Development", type: "Technical", subOptions: ["Frontend Focus", "Backend Focus"] },
    { id: 4, name: "Cybersecurity Lab", type: "Technical", subOptions: ["Ethical Hacking", "Security Audit"] },
    { id: 5, name: "Cloud Computing", type: "Technical", subOptions: ["AWS Workshop", "Azure Workshop"] },
    { id: 6, name: "Data Science", type: "Technical", subOptions: ["Analytics Track", "ML Track"] },
    { id: 7, name: "Startup Pitch", type: "Non-Technical", subOptions: ["Idea Presentation", "Business Plan"] },
    { id: 8, name: "Leadership Talk", type: "Non-Technical", subOptions: ["Team Management", "Vision Setting"] },
    { id: 9, name: "Design Thinking", type: "Non-Technical", subOptions: ["UX Design", "Product Design"] },
    { id: 10, name: "Career Growth", type: "Non-Technical", subOptions: ["Skill Development", "Career Planning"] },
    { id: 11, name: "Networking Hub", type: "Non-Technical", subOptions: ["Professional Network", "Mentor Connect"] },
    { id: 12, name: "Innovation Panel", type: "Non-Technical", subOptions: ["Future Trends", "Industry Insights"] }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleEventSelection = (eventId, subOption = null) => {
    setSelectedEvents(prev => {
      const existingIndex = prev.findIndex(item => item.eventId === eventId);
      
      if (existingIndex >= 0) {
        // Event already selected, toggle sub-option or remove
        const existing = prev[existingIndex];
        if (subOption) {
          if (existing.subOption === subOption) {
            // Same sub-option clicked, remove the event
            return prev.filter(item => item.eventId !== eventId);
          } else {
            // Different sub-option, update it
            const updated = [...prev];
            updated[existingIndex] = { eventId, subOption };
            return updated;
          }
        } else {
          // No sub-option provided, remove the event
          return prev.filter(item => item.eventId !== eventId);
        }
      } else {
        // Event not selected, add it
        return [...prev, { eventId, subOption }];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (formData.phone && phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (selectedEvents.length === 0) {
      newErrors.events = 'Please select at least one event';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const registrationData = {
        ...formData,
        selected_events: selectedEvents.map(item => item.eventId),
        num_events: selectedEvents.length,
        event_details: selectedEvents
      };

      const response = await apiService.createRegistration(registrationData);
      
      if (response.data.success) {
        navigate(`/payment/${response.data.registration_id}`);
      } else {
        setErrors({ general: response.data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: error.response?.data?.error || 'Registration failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const technicalEvents = events.filter(event => event.type === 'Technical');
  const nonTechnicalEvents = events.filter(event => event.type === 'Non-Technical');

  return (
    <div className="registration-page">
      <div className="registration-container">
        
        {/* Header */}
        <div className="registration-header">
          <h1>Join Zehinix Symposium 2025</h1>
          <p>Register now to secure your spot at the premier tech event</p>
          <div className="registration-fee">
            Registration Fee: <span className="amount">₹500</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          {/* Personal Details Section */}
          <div className="form-section">
            <h3>📋 Personal Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                  disabled={loading}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
                disabled={loading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="college">College/University *</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className={errors.college ? 'error' : ''}
                  placeholder="Enter your college/university name"
                  disabled={loading}
                />
                {errors.college && <span className="error-text">{errors.college}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? 'error' : ''}
                  placeholder="Enter your department"
                  disabled={loading}
                />
                {errors.department && <span className="error-text">{errors.department}</span>}
              </div>
            </div>
          </div>

          {/* Event Selection Section */}
          <div className="form-section">
            <h3>🎯 Select Events ({selectedEvents.length}/12)</h3>
            
            <div className="event-selector">
              <div 
                className={`event-dropdown-trigger ${eventDropdownOpen ? 'active' : ''} ${errors.events ? 'error' : ''}`}
                onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
              >
                <span className="dropdown-text">
                  {selectedEvents.length === 0 
                    ? 'Click to select events you want to participate in'
                    : `${selectedEvents.length} event${selectedEvents.length > 1 ? 's' : ''} selected`
                  }
                </span>
                <span className={`dropdown-arrow ${eventDropdownOpen ? 'up' : 'down'}`}>▼</span>
              </div>
              
              {errors.events && <span className="error-text">{errors.events}</span>}

              {eventDropdownOpen && (
                <div className="event-dropdown">
                  
                  {/* Technical Events */}
                  <div className="event-category">
                    <h4>🔧 Technical Events</h4>
                    <div className="events-grid">
                      {technicalEvents.map(event => (
                        <div key={event.id} className="event-item">
                          <div className="event-header">
                            <span className="event-name">{event.name}</span>
                          </div>
                          <div className="sub-options">
                            {event.subOptions.map(subOption => (
                              <label key={subOption} className="sub-option">
                                <input
                                  type="radio"
                                  name={`event-${event.id}`}
                                  checked={selectedEvents.some(item => 
                                    item.eventId === event.id && item.subOption === subOption
                                  )}
                                  onChange={() => toggleEventSelection(event.id, subOption)}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="sub-option-text">{subOption}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Non-Technical Events */}
                  <div className="event-category">
                    <h4>🎨 Non-Technical Events</h4>
                    <div className="events-grid">
                      {nonTechnicalEvents.map(event => (
                        <div key={event.id} className="event-item">
                          <div className="event-header">
                            <span className="event-name">{event.name}</span>
                          </div>
                          <div className="sub-options">
                            {event.subOptions.map(subOption => (
                              <label key={subOption} className="sub-option">
                                <input
                                  type="radio"
                                  name={`event-${event.id}`}
                                  checked={selectedEvents.some(item => 
                                    item.eventId === event.id && item.subOption === subOption
                                  )}
                                  onChange={() => toggleEventSelection(event.id, subOption)}
                                />
                                <span className="radio-checkmark"></span>
                                <span className="sub-option-text">{subOption}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Events Preview */}
            {selectedEvents.length > 0 && (
              <div className="selected-events-preview">
                <h4>Selected Events:</h4>
                <div className="selected-events-list">
                  {selectedEvents.map((selection) => {
                    const event = events.find(e => e.id === selection.eventId);
                    return (
                      <div key={selection.eventId} className="selected-event-tag">
                        <span>{event.name} - {selection.subOption}</span>
                        <button 
                          type="button" 
                          onClick={() => toggleEventSelection(selection.eventId)}
                          className="remove-event"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="back-btn"
              disabled={loading}
            >
              ← Back to Home
            </button>
            
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Processing...
                </>
              ) : (
                'Proceed to Payment →'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
