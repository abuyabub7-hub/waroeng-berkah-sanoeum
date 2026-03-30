// token-payment.js

// Function to validate phone number
function validatePhoneNumber(phone) {
    const regex = /^[0-9]{10,15}$/; // Example regex for phone number validation
    return regex.test(phone);
}

// Function to handle payment method selection
function selectPaymentMethod(method) {
    if (method === 'QRIS') {
        // Process QRIS payment
        console.log('QRIS payment method selected');
    } else if (method === 'Cash') {
        // Process Cash payment
        console.log('Cash payment method selected');
    } else {
        console.error('Invalid payment method');
    }
}

// Function to print receipt
function printReceipt(paymentDetails) {
    console.log('Receipt:');
    console.log(`Amount: ${paymentDetails.amount}`);
    console.log(`Payment Method: ${paymentDetails.method}`);
    console.log(`Date: ${new Date().toUTCString()}`);
}

// Usage example
const phone = '1234567890';
if (validatePhoneNumber(phone)) {
    console.log('Valid phone number');
    selectPaymentMethod('QRIS'); // Choose your payment method here
    printReceipt({ amount: 100, method: 'QRIS' }); // Example payment details
} else {
    console.error('Invalid phone number');
}