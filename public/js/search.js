document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
    const resultsTable = document.getElementById('resultsTable');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const khatianNo = document.getElementById('khatianNo').value;
        const plotNo = document.getElementById('plotNo').value;
        const owner = document.getElementById('owner').value;
        const mouza = document.getElementById('mouza').value;
        const district = document.getElementById('district').value;

        // Show loading spinner
        showLoading();

        // Simulate API call (will be replaced with actual fetch)
        setTimeout(() => {
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    khatianNo,
                    plotNo,
                    owner,
                    mouza,
                    district
                })
            })
            .then(response => response.json())
            .then(data => {
                displayResults(data);
                hideLoading();
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Failed to fetch search results', 'danger');
                hideLoading();
            });
        }, 1000);
    });

    function displayResults(records) {
        // Clear previous results
        resultsTable.innerHTML = '';

        if (records.length === 0) {
            resultsTable.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4">No records found matching your search criteria</td>
                </tr>
            `;
            searchResults.classList.remove('d-none');
            return;
        }

        // Populate results
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.khatianNo}</td>
                <td>${record.plotNo}</td>
                <td>${record.mouza}</td>
                <td>${record.district}</td>
                <td>${record.owner}</td>
                <td>${record.area}</td>
                <td>${record.type}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary view-details" data-id="${record.khatianNo}">
                        View Details
                    </button>
                </td>
            `;
            resultsTable.appendChild(row);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const khatianNo = this.getAttribute('data-id');
                viewRecordDetails(khatianNo);
            });
        });

        searchResults.classList.remove('d-none');
    }

    function viewRecordDetails(khatianNo) {
        showLoading();
        // In a real app, this would fetch detailed record from API
        setTimeout(() => {
            showToast(`Viewing details for Khatian No: ${khatianNo}`, 'info');
            hideLoading();
            // Here you would typically redirect to a details page or show a modal
        }, 500);
    }
});