const player = document.getElementById("player");
const skipBtn = document.getElementById("skip-btn");
const video = document.getElementById("video");
const startBtn = document.getElementById("start-btn");

const TARGET_URL =
    "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Bitwise_AND";

let skipStarted = false;
let started = false;

function startSkipOnce() {
    if (skipStarted) return;
    skipStarted = true;
    setupSkipButton();
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

async function enterFullscreen() {
    if (!document.fullscreenElement && player.requestFullscreen) {
        try {
            await player.requestFullscreen();
        } catch {}
    }
}

async function startExperience() {
    if (started) return;
    started = true;

    startSkipOnce();
    video.muted = false;
    await video.play().catch(() => {});
    await enterFullscreen();
    startBtn.hidden = true;
}

function bindStartOnUserGesture() {
    const options = { once: true };
    window.addEventListener("pointerdown", startExperience, options);
    window.addEventListener("touchstart", startExperience, options);
    window.addEventListener("keydown", startExperience, options);
}

window.addEventListener("load", bindStartOnUserGesture);

skipBtn.addEventListener("click", () => {
    window.location.href = TARGET_URL;
});

startBtn.addEventListener("click", startExperience);
