import React, { useState } from 'react';

function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
  
      // const response = await fetch('http://localhost:5001/api/pay', {
      const response = await fetch('http://localhost:4400/api/pay',{
        method: 'POST',
      });
  
      if (response.ok) {
        // Handle successful response
        const responseData = await response.json();
        console.log('Payment initiated successfully', responseData);
  
        // Assuming the expected structure is responseData.data.checkout_url
        const checkoutURL = responseData;
        if (checkoutURL) {
          // Redirect to the Chapa checkout URL after data is returned
          window.open (checkoutURL,'_blank');
          console.log("checkout_url", checkoutURL);
        } else {
          console.error('Checkout URL not found in the response data');
        }
      } else {
        // Handle error response
        console.error('Payment initiation failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Errors:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="rounded-3xl p-4 font-bold bg-sky-700 text-white"
        disabled={loading}
      >
        {loading ? 'Initiating payment...' : 'Order Print'}
      </button>
    </div>
  );
}

export default Home;
