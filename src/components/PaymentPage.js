import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Event list for checkboxes
  const events = [
    { id: 1, name: "AI Workshop", type: "Technical" },
    { id: 2, name: "Blockchain Summit", type: "Technical" },
    { id: 3, name: "Web3 Development", type: "Technical" },
    { id: 4, name: "Cybersecurity Lab", type: "Technical" },
    { id: 5, name: "Cloud Computing", type: "Technical" },
    { id: 6, name: "Data Science", type: "Technical" },
    { id: 7, name: "Startup Pitch", type: "Non-Technical" },
    { id: 8, name: "Leadership Talk", type: "Non-Technical" },
    { id: 9, name: "Design Thinking", type: "Non-Technical" },
    { id: 10, name: "Career Growth", type: "Non-Technical" },
    { id: 11, name: "Networking Hub", type: "Non-Technical" },
    { id: 12, name: "Innovation Panel", type: "Non-Technical" }
  ];

 useEffect(() => {
    if (!registrationId) {
        navigate('/register');
        return;
    }
    fetchRegistrationData();
}, [registrationId, navigate, fetchRegistrationData]);

  const fetchRegistrationData = async () => {
    try {
      const response = await apiService.getRegistration(registrationId);
      if (response.data.success) {
        setRegistrationData(response.data.data);
        if (response.data.data.payment_status === 'paid') {
          setError('This registration has already been paid for.');
        }
      } else {
        setError('Registration not found');
      }
    } catch (error) {
      setError('Failed to load registration details');
    } finally {
      setLoading(false);
    }
  };

  const toggleEventSelection = (eventId) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const handlePayment = async () => {
    if (selectedEvents.length === 0) {
      alert('Please select at least one event to participate in.');
      return;
    }

    setPaymentLoading(true);
    
    try {
      // Update registration with selected events
      await apiService.updateRegistration(registrationId, {
        selected_events: selectedEvents,
        num_events: selectedEvents.length
      });

      const orderResponse = await apiService.createRazorpayOrder(registrationId);
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.error);
      }

      const orderData = orderResponse.data;
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        order_id: orderData.order_id,
        prefill: orderData.prefill,
        theme: {
          color: '#B8860B'
        },
        handler: async function (response) {
          try {
            const verificationResponse = await apiService.verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResponse.data.success) {
              setPaymentSuccess(true);
              setTimeout(() => navigate('/'), 4000);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            setPaymentLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <h2>Loading Payment Details</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="error-section">
            <div className="error-icon">⚠️</div>
            <h2>Payment Error</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={() => navigate('/register')} className="secondary-btn">
                Back to Registration
              </button>
              <button onClick={() => navigate('/')} className="primary-btn">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="success-section">
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>🎉 Registration Successful!</h2>
            <p>Welcome to Zehinix Symposium 2025!</p>
            <div className="success-details">
              <p><strong>Name:</strong> {registrationData.name}</p>
              <p><strong>Events Selected:</strong> {selectedEvents.length}</p>
              <p><strong>Amount Paid:</strong> ₹{registrationData.registration_fee}</p>
            </div>
            <p className="redirect-message">
              📧 Confirmation email sent! Redirecting to home...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const technicalEvents = events.filter(event => event.type === "Technical");
  const nonTechnicalEvents = events.filter(event => event.type === "Non-Technical");

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Complete Your Registration</h1>
          <p>Select events you want to participate in</p>
          <div className="price-display">
            <span className="currency">₹</span>
            <span className="amount">{registrationData.registration_fee}</span>
          </div>
        </div>

        <div className="registration-summary">
          <h3>📋 Registration Details</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span><strong>Name:</strong> {registrationData.name}</span>
            </div>
            <div className="summary-item">
              <span><strong>Email:</strong> {registrationData.email}</span>
            </div>
            <div className="summary-item">
              <span><strong>College:</strong> {registrationData.college}</span>
            </div>
            <div className="summary-item">
              <span><strong>Department:</strong> {registrationData.department}</span>
            </div>
          </div>
        </div>

        {/* Event Selection Section */}
        <div className="event-selection">
          <h3>🎯 Select Events to Participate ({selectedEvents.length}/12)</h3>
          
          {/* Technical Events */}
          <div className="event-category">
            <h4>🔧 Technical Events</h4>
            <div className="checkbox-grid">
              {technicalEvents.map(event => (
                <label key={event.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => toggleEventSelection(event.id)}
                  />
                  <span className="checkmark"></span>
                  <span className="event-name">{event.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Non-Technical Events */}
          <div className="event-category">
            <h4>🎨 Non-Technical Events</h4>
            <div className="checkbox-grid">
              {nonTechnicalEvents.map(event => (
                <label key={event.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => toggleEventSelection(event.id)}
                  />
                  <span className="checkmark"></span>
                  <span className="event-name">{event.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <button 
            onClick={() => navigate('/register')}
            className="secondary-btn"
            disabled={paymentLoading}
          >
            ← Back to Registration
          </button>
          <button 
            onClick={handlePayment}
            disabled={paymentLoading || selectedEvents.length === 0} 
            className="primary-btn"
          >
            {paymentLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              `Pay ₹${registrationData.registration_fee} for ${selectedEvents.length} Events`
            )}
          </button>
        </div>

        <div className="security-info">
          <p>🔒 Secured by Razorpay | 256-bit SSL Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
