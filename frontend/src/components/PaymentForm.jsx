import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';

// Get your key from your dashboard
const stripePromise = loadStripe('pk_test_51PlwDkRwH17n1GPuKMOzF78A2dLojEm0waiPJwGxl81n0seK3iCh3z8SAzdlR0nGQRpOR7c8ozjVmm1R5nA6bJKB00nUbIb8yt');

const CheckoutForm = ({ totalAmount, eventId, userId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount * 100 }), // Amount should be in the lowest denomination (For USD thats cents)
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Test User',
        },
      },
    })

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        purchaseTickets();
      }
    }
  };

  const purchaseTickets = async () => {
    const response = await fetch(`http://localhost:5000/inventory/buy`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({eventId, userId,})
    }).then(response => {
      if(response.ok){
        console.log("tickets purchased")
      } else{
        setPaymentSuccess(false);
        setError(response.error.message);
      }
    }).catch(error => console.error(('Error purchasing ticket', error)), []);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <FormControl mb={4}>
        <FormLabel>Total Amount</FormLabel>
        <Text fontSize="xl">${totalAmount.toFixed(2)}</Text>
      </FormControl>
      <FormControl>
        <FormLabel>Card Details</FormLabel>
        <CardElement />
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit" disabled={!stripe} onClick={purchaseTickets}>
        Pay
      </Button>
      {paymentSuccess && <Text mt={4} color="green.500">Payment Successful!</Text>}
      {error && <Text mt={4} color="red.500">{error}</Text>}
    </Box>
  );
};

const PaymentForm = ({ totalAmount, eventId, userId}) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} eventId={eventId} userId={userId} />
  </Elements>
);

export default PaymentForm;