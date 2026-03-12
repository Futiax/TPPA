const player = document.getElementById("player");
const btn = document.getElementById("fs-btn");
const skipBtn = document.getElementById("skip-btn");

const TARGET_URL =
    "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Bitwise_AND";

async function requestFs() {
    if (!document.fullscreenElement && player.requestFullscreen) {
        try {
            await player.requestFullscreen();
            btn.style.display = "none";
        } catch {
            // Certains navigateurs exigent un geste utilisateur
        }
    }
}

function setupSkipButton() {
    let remaining = 5;
    skipBtn.hidden = false;
    skipBtn.disabled = true;
    skipBtn.textContent = `Passer la pub (${remaining})`;

    const timer = setInterval(() => {
        remaining -= 1;

        if (remaining <= 0) {
            clearInterval(timer);
            skipBtn.textContent = "Passer la pub";
            skipBtn.disabled = false;
            return;
        }

        skipBtn.textContent = `Passer la pub (${remaining})`;
    }, 1000);
}

window.addEventListener("load", () => {
    setupSkipButton();
    player.src = TARGET_URL;
});

btn.addEventListener("click", requestFs);
skipBtn.addEventListener("click", () => {
    window.location.href = TARGET_URL;
});
