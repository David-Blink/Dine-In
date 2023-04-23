// Set your UPI merchant details
const merchantDetails = {
  vpa: "9597851787@axl",
  name: "Prakaash Murugesan",
};

// Set the payment amount
const paymentAmount = "25.00";

// Generate the payment URL
const paymentUrl = `upi://pay?pa=${merchantDetails.vpa}&pn=${merchantDetails.name}&am=${paymentAmount}`;

// Generate the QR code for the payment URL
const qr = qrcode(0, 'M');
qr.addData(paymentUrl);
qr.make();
const qrCodeData = qr.createDataURL(10, 10, 2);

// Display the QR code
const qrCodeElement = document.getElementById("qrcode");
qrCodeElement.innerHTML = `<img src="${qrCodeData}" alt="QR Code">`;

// Send the payment request to the UPI payment gateway
function makePayment() {
  const transactionId = Date.now().toString();
  const txnHash = sha256(transactionId);

  axios.post('https://your-upi-merchant-api.com/payment', {
      txnId: transactionId,
      txnHash: txnHash,
      amount: paymentAmount,
      vpa: merchantDetails.vpa,
    })
    .then(function (response) {
      console.log(response);
      // Poll for transaction status after payment is initiated
      setInterval(function() {
        axios.get(`https://your-upi-merchant-api.com/payment/${transactionId}`)
          .then(function (response) {
            console.log(response);
            if (response.data.status === 'SUCCESS') {
              handlePaymentSuccess(response);
            } else if (response.data.status === 'FAILURE') {
              handlePaymentFailure(response);
            }
          })
          .catch(function (error) {
            console.error(error);
            alert("Failed to get transaction status.");
          });
      }, 10000); // Poll every 10 seconds
    })
    .catch(function (error) {
      console.error(error);
      alert("Failed to initiate payment.");
    });
}

// Handle the payment success callback
function handlePaymentSuccess(response) {
  console.log("Payment successful:", response);
  alert("Payment successful!");
  
  // Redirect to another HTML page after payment is done
  window.location.href = "end.html";
}

// Handle the payment failure callback
function handlePaymentFailure(error) {
  console.error("Payment failed:", error);
  alert("Payment failed.");
}




var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});