document.addEventListener("DOMContentLoaded", function() {
    const progress = document.querySelector(".progress");
    const text = document.querySelector(".text");
    const targetPercent = 75; // Change this to the desired percentage
    
    const recordButton = document.getElementById('record-button');
    const recordForm = document.getElementById('record-form');
    const cancelButton = document.getElementById('cancel-button');

    let currentPercent = 0;
    let interval;

    function updateProgress() {
        if (currentPercent >= targetPercent) {
            clearInterval(interval);
        } else {
            currentPercent++;
            progress.style.clip = `rect(0, ${currentPercent}%, 100%, 0)`;
            text.textContent = `${currentPercent}%`;
        }
    }

    interval = setInterval(updateProgress, 30); // Adjust speed if needed

    recordButton.addEventListener('click', () => {
        recordForm.style.display = 'block'; // Show the form
    });
    
    // Event listener for the Cancel button in the form
    cancelButton.addEventListener('click', () => {
        recordForm.style.display = 'none'; // Hide the form
    });
    
    // Optional: Handle form submission (you can add this based on your needs)
    const dailyRecordForm = document.getElementById('daily-record-form');
    console(dailyRecordForm);
    dailyRecordForm.addEventListener('submit', async (event) => {
        console.log("Form submitted");
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(dailyRecordForm);
        const walkDuration = formData.get('walk-duration');
        const caloriesIntake = formData.get('calories-intake');
        const exerciseMinutes = formData.get('exercise-minutes');

        try {
            const response = await fetch('/save-record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walkDuration,
                    caloriesIntake,
                    exerciseMinutes
                    // Add more fields as needed
                })
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            recordForm.style.display = 'none'; // Hide the form after successful submission
        } catch (error) {
            console.error('Error:', error);
            // Handle errors if any
        }
    });
});