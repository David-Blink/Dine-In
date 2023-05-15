document.addEventListener("DOMContentLoaded", function() {
  var anchorButton = document.getElementById("anchor-button");
  anchorButton.style.display = "none";
  function displayButton() {
    anchorButton.style.display = "block";
  }
  // Set a timeout of 1 minute (60,000 milliseconds)
  setTimeout(displayButton, 45000);
});

const merchantDetails = {
  vpa: "9597851787@axl",
  name: "Prakaash Murugesan",
};

const paymentAmount = "25.00";
const paymentUrl = `upi://pay?pa=${merchantDetails.vpa}&pn=${merchantDetails.name}&am=${paymentAmount}`;

const qr = qrcode(0, 'M');
qr.addData(paymentUrl);
qr.make();
const qrCodeData = qr.createDataURL(10, 10, 2);

const qrCodeElement = document.getElementById("qrcode");
qrCodeElement.innerHTML = `<img src="${qrCodeData}" title="Pay To Prakaash Murugesan Through QR Code">`;

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
      setInterval(function () {
        axios.get(`https://your-upi-merchant-api.com/payment/${transactionId}`)
          .then(function (response) {
            console.log(response);
            if (response.data.status === 'SUCCESS') {
              console.log("SUCCESS");
            } 
          })
          .catch(function (error) {
            console.error(error);
            alert("Failed to get transaction status.");
          });
      }, 10000);
    })
    .catch(function (error) {
      console.error(error);
      alert("Failed to initiate payment.");
    });
}

var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});
