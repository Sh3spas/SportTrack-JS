document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.querySelector('input[type="file"]');
    const filenameInput = document.getElementById('filename');

    fileInput.addEventListener('change', function () {
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    const description = jsonData.activity.description;
                    filenameInput.value = description;
                } catch (error) {
                    console.error("Erreur lors de la lecture du fichier JSON :", error);
                }
            };

            reader.readAsText(selectedFile);
        }
    });
});