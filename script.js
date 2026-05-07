async function getStatus() {
    // 1. Find the container
    const cards = document.querySelectorAll('.statusCard');

    cards.forEach(async (card) => {
        // 2. Get the specific URL for this card from the data attribute
        const jsonUrl = card.getAttribute('data-json-url');
        const statusEl = card.querySelector('#Status');
        const updatedEl = card.querySelector('#Updated');

        try {
            // 3. Fetch the JSON (local path + cache buster)
            const response = await fetch(`${jsonUrl}?t=${new Date().getTime()}`);
            const data = await response.json();

            // 4. Update the elements inside THIS specific card
            if (statusEl) {
                statusEl.textContent = data.message;
            }
            if (updatedEl) {
                const dateAttempt = new Date(data.updated);
                
                // If it's a valid date object (ISO format), format it nicely
                if (!isNaN(dateAttempt.getTime())) {
                    updatedEl.textContent = `Last updated: ${dateAttempt.toLocaleString()}`;
                } else {
                    // If it's the "May 7 at 8:21 AM" format, just show it directly
                    updatedEl.textContent = `Last updated: ${data.updated}`;
                }
            }
        } catch (error) {
            if (statusEl) {
                statusEl.textContent = "Couldn't load status.";
            }
            console.error("Error fetching status:", error);
        }
    });
}

// Call the function
getStatus();