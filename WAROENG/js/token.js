// token.js

// Token/Pulsa Payment System

// Function to handle phone number input
function getPhoneNumber() {
    const phoneNumber = prompt('Enter your phone number:');
    return phoneNumber;
}

// Supported payment methods
const paymentMethods = ['QRIS', 'Cash'];

// Function to display payment methods
function selectPaymentMethod() {
    const method = prompt('Select payment method: \n1. QRIS \n2. Cash');
    return paymentMethods[method - 1];
}

// Function to print receipt
function printReceipt(phoneNumber, paymentMethod) {
    const receipt = `Receipt: \nPhone Number: ${phoneNumber} \nPayment Method: ${paymentMethod} \nDate: ${new Date().toISOString().slice(0, 19).replace('T', ' ')} `;
    console.log(receipt);
}

// Main function to execute payment process
function processPayment() {
    const phoneNumber = getPhoneNumber();
    const paymentMethod = selectPaymentMethod();
    printReceipt(phoneNumber, paymentMethod);
}

// Execute the payment process
processPayment();
