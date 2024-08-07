import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payments.css';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Pkoi9RthmFe68yKJoZ2z3Gcldsz2YB1F5wTpFr4WmV9AISc3Awk6XRECrLTZ2Buy8wp5pDvncgtdsoquhqgNEiO0069Sx83w5');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { totalWithTax } = location.state || {}; // Destructure totalWithTax with default empty object

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Simulate a successful payment for test purposes
    setTimeout(() => {
      setLoading(false);
      setError(null);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <form onSubmit={handleCheckout} className="checkout-form">
      <h3>Total Amount: ${totalWithTax}</h3>
      <CardElement />
      {error && <div className="card-error">{error}</div>}
      {paymentSuccess && <div className="payment-success">Payment Successful!</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Payments = () => {
  return (
    <div className='paypage'>
      <Elements stripe={stripePromise}>
        <div className="payment-container">
          <h2>Checkout</h2>
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payments;
