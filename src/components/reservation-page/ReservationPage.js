import React, { useState } from 'react';
import BookingForm from './BookingForm';
import SuccessScreen from './SuccessScreen';

function ReservationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <main>
      {isSubmitted ? (
        <SuccessScreen onReset={handleReset} />
      ) : (
        <BookingForm onSuccess={handleSuccess} />
      )}
    </main>
  );
}

export default ReservationPage;