document.addEventListener("DOMContentLoaded", function() {
    const progress = document.querySelector(".progress");
    const text = document.querySelector(".text");
    const targetPercent = 75; // Change this to the desired percentage

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
});