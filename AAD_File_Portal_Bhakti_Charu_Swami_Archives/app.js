const fileInput = document.getElementById("fileInput");
const uploadButtonElement = document.getElementById("uploadButton");

uploadButtonElement.addEventListener("click", async function () {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function () {
        try {
            // Extract pure base64 data string
            const base64 = reader.result.split(",")[1];

            // 1. Package the file metadata as a standard JS object
            const payload = {
                fileName: file.name,
                mimeType: file.type,
                data: base64
            };

            // Disable button during execution
            uploadButtonElement.disabled = true;
            uploadButtonElement.innerText = "Uploading...";

            // 2. Send data using POST with stringified JSON text content
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbx5KBIQiIR0H9x0Jx_fa07Io9z7BoTAnL6Nej8IP1av8pqTH71DV7x9r3neGxC_oOPh/exec",
                {
                    method: "POST",
                    body: JSON.stringify(payload) // Changed from formData
                }
            );

            const result = await response.json();
            console.log(result);

            if (result.success) {
                alert("Upload Successful!");
            } else {
                alert("Server Error: " + result.error);
            }

        } catch (error) {
            console.error("Fetch Execution Error:", error);
            alert("Upload Failed.");
        } finally {
            uploadButtonElement.disabled = false;
            uploadButtonElement.innerText = "Upload File";
        }
    };

    reader.readAsDataURL(file);
});
