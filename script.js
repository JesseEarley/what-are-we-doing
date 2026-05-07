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
                // Formatting the date to look a bit nicer
                const date = new Date(data.updated);
                updatedEl.textContent = `Last updated: ${date.toLocaleString()}`;
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