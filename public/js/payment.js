document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const taxAmountInput = document.getElementById('taxAmount');

    // Simulate tax calculation when property details are entered
    document.getElementById('paymentKhatian').addEventListener('change', calculateTax);
    document.getElementById('paymentPlot').addEventListener('change', calculateTax);
    document.getElementById('paymentMouza').addEventListener('change', calculateTax);
    document.getElementById('paymentDistrict').addEventListener('change', calculateTax);
    document.getElementById('taxYear').addEventListener('change', calculateTax);

    function calculateTax() {
        const khatianNo = document.getElementById('paymentKhatian').value;
        const plotNo = document.getElementById('paymentPlot').value;
        const mouza = document.getElementById('paymentMouza').value;
        const district = document.getElementById('paymentDistrict').value;
        const year = document.getElementById('taxYear').value;

        // Only calculate if all required fields are filled
        if (khatianNo && plotNo && mouza && district && year) {
            // Show loading
            showLoading();

            // Simulate API call to calculate tax
            setTimeout(() => {
                // In a real app, this would fetch from your backend
                const baseAmount = 500; // Base amount for demo
                const randomVariation = Math.floor(Math.random() * 1000);
                const calculatedAmount = baseAmount + randomVariation;
                
                taxAmountInput.value = calculatedAmount.toFixed(2);
                hideLoading();
            }, 1000);
        }
    }

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(paymentForm)) {
            showToast('Please fill all required fields correctly', 'warning');
            return;
        }

        // Get form data
        const formData = {
            property: {
                khatianNo: document.getElementById('paymentKhatian').value,
                plotNo: document.getElementById('paymentPlot').value,
                mouza: document.getElementById('paymentMouza').value,
                district: document.getElementById('paymentDistrict').value
            },
            tax: {
                year: document.getElementById('taxYear').value,
                amount: taxAmountInput.value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
        };

        // Show loading spinner
        showLoading();

        // Simulate payment processing
        setTimeout(() => {
            // In a real app, this would integrate with a payment gateway
            console.log('Payment submitted:', formData);
            
            // Show success message
            showToast('Payment processed successfully!', 'success');
            
            // Reset form
            paymentForm.reset();
            taxAmountInput.value = '0.00';
            
            // Hide loading spinner
            hideLoading();
            
            // In a real app, you might show a receipt or redirect
        }, 2000);
    });
});