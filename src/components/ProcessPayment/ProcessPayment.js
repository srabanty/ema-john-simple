import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SpliteCardForm from './SpliteCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51HaNqXAfeIofCh4A0rGS3qZp0My8i8bkj8LvYCzuNQ46qlmO374iclMm2HCCOQgRDfM5ATOvu88Jc0CNNdlU0rTf00KX6KbhoG');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;