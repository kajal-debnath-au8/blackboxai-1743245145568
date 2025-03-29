document.addEventListener('DOMContentLoaded', function() {
    const mutationForm = document.getElementById('mutationForm');

    mutationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(mutationForm)) {
            showToast('Please fill all required fields correctly', 'warning');
            return;
        }

        // Get form data
        const formData = {
            property: {
                khatianNo: document.getElementById('mutationKhatian').value,
                plotNo: document.getElementById('mutationPlot').value,
                mouza: document.getElementById('mutationMouza').value,
                district: document.getElementById('mutationDistrict').value
            },
            applicant: {
                name: document.getElementById('applicantName').value,
                phone: document.getElementById('applicantPhone').value,
                email: document.getElementById('applicantEmail').value,
                aadhaar: document.getElementById('applicantAadhaar').value,
                address: document.getElementById('applicantAddress').value
            },
            mutation: {
                type: document.getElementById('mutationType').value,
                date: document.getElementById('mutationDate').value,
                reason: document.getElementById('mutationReason').value
            }
        };

        // Show loading spinner
        showLoading();

        // Simulate API submission (will be replaced with actual fetch)
        setTimeout(() => {
            // In a real app, this would be a fetch to your backend API
            console.log('Mutation application submitted:', formData);
            
            // Show success message
            showToast('Mutation application submitted successfully!', 'success');
            
            // Reset form
            mutationForm.reset();
            
            // Hide loading spinner
            hideLoading();
            
            // In a real app, you might redirect to a confirmation page
            // or show the application reference number
        }, 2000);
    });

    // Additional validation for specific fields
    document.getElementById('applicantPhone').addEventListener('input', function() {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    document.getElementById('applicantAadhaar').addEventListener('input', function() {
        const aadhaarRegex = /^[0-9]{12}$/;
        if (!aadhaarRegex.test(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    document.getElementById('applicantEmail').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
});