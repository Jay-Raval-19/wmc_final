import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payments.css';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51Pkoi9RthmFe68yKJoZ2z3Gcldsz2YB1F5wTpFr4WmV9AISc3Awk6XRECrLTZ2Buy8wp5pDvncgtdsoquhqgNEiO0069Sx83w5');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Create a payment intent on your backend
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Math.round(1000) }), // Replace with actual amount
    });

    const { clientSecret } = await response.json();

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setError(null);
        setLoading(false);
        // Redirect to payment success page
        window.location.href = '/payment-success';
      }
    }
  };

  return (
    <form onSubmit={handleCheckout} className="checkout-form">
      <CardElement />
      {error && <div className="card-error">{error}</div>}
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
