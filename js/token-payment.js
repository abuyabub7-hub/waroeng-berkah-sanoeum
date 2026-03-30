// token-payment.js

// Function to handle phone input and payment options
function initPaymentSystem() {
    const phoneInput = document.createElement('input');
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('placeholder', 'Enter Phone Number');
    document.body.appendChild(phoneInput);

    const paymentMethods = ['QRIS', 'Cash'];
    paymentMethods.forEach(method => {
        const button = document.createElement('button');
        button.innerText = method;
        button.addEventListener('click', () => handlePayment(method, phoneInput.value));
        document.body.appendChild(button);
    });
}

// Function to handle payment logic
function handlePayment(method, phone) {
    if (phone.length === 0) {
        alert('Please enter a valid phone number.');
        return;
    }
    switch (method) {
        case 'QRIS':
            // logic for QRIS payment integration
            alert(`QRIS payment initiated for phone: ${phone}`);
            printReceipt(phone, method);
            break;
        case 'Cash':
            // logic for Cash payment integration
            alert(`Cash payment initiated for phone: ${phone}`);
            printReceipt(phone, method);
            break;
        default:
            alert('Unknown payment method.');
    }
}

// Function to print a receipt
function printReceipt(phone, method) {
    const receipt = `Receipt\nDate: ${new Date().toISOString()}\nPhone: ${phone}\nPayment Method: ${method}`;
    console.log(receipt);
    alert('Receipt printed to console.');
}

// Initialize the payment system on page load
window.onload = initPaymentSystem;