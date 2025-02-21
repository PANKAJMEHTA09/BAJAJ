

async function submitData() {
    const jsonInput = document.getElementById("jsonInput").value;
    const errorMessage = document.getElementById("errorMessage");
    const responseBox = document.getElementById("responseBox");
    const filterOptions = document.getElementById("filterOptions");
    const filterButton = document.getElementById("filterButton");

    errorMessage.textContent = ""; 
    responseBox.style.display = "none";
    filterOptions.style.display = "none";
    filterButton.style.display = "none";

    try {
        const parsedJson = JSON.parse(jsonInput); // Validate JSON

        if (!parsedJson.data) {
            throw new Error("Invalid JSON: 'data' key is required");
        }

        const response = await fetch("http://localhost:8080/bfhl", { // Change URL if deployed
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedJson),
        });

        if (!response.ok) {
            throw new Error("API error: " + response.status);
        }

        const data = await response.json();
        fullResponse = data;

        document.getElementById("responseData").textContent = JSON.stringify(data, null, 2);
        responseBox.style.display = "block";
        filterOptions.style.display = "block";
        filterButton.style.display = "block";

    } catch (error) {
        errorMessage.textContent = "Invalid JSON format or API error.";
        console.error(error);
    }
}
