document.addEventListener("DOMContentLoaded", function () {
    let fullResponse = null; // Store full response globally

    async function submitData() {
        const jsonInput = document.getElementById("jsonInput").value;
        const errorMessage = document.getElementById("errorMessage");
        const responseBox = document.getElementById("responseBox");
        const filterOptions = document.getElementById("filterOptions");
        const filterButton = document.getElementById("filterButton");

        errorMessage.textContent = ""; // Clear previous errors
        responseBox.style.display = "none";
        filterOptions.style.display = "none";
        filterButton.style.display = "none";

        try {
            const parsedJson = JSON.parse(jsonInput); // Validate JSON

            if (!parsedJson.data) {
                throw new Error("Invalid JSON: 'data' key is required");
            }

            // Call backend API
            const response = await fetch("https://your-backend-url/bfhl", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedJson),
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();
            fullResponse = data; // Store full response

            // Show response box
            document.getElementById("responseData").textContent = JSON.stringify(data, null, 2);
            responseBox.style.display = "block";

            // Show multi-select dropdown & filter button
            filterOptions.style.display = "block";
            filterButton.style.display = "block";

        } catch (error) {
            errorMessage.textContent = "Invalid JSON format or API error.";
        }
    }

    function filterResponse() {
        if (!fullResponse) return;

        const selectedOptions = Array.from(document.getElementById("filterOptions").selectedOptions)
            .map(option => option.value);

        let filteredData = {};
        selectedOptions.forEach(option => {
            if (fullResponse.hasOwnProperty(option)) {
                filteredData[option] = fullResponse[option];
            }
        });

        document.getElementById("responseData").textContent = JSON.stringify(filteredData, null, 2);
    }

    // Attach functions to global scope
    window.submitData = submitData;
    window.filterResponse = filterResponse;
});
