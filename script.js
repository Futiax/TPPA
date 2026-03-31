const player = document.getElementById("player");
const skipBtn = document.getElementById("skip-btn");
const video = document.getElementById("video");
const rickrollLink = document.getElementById("rickroll-link");

const TARGET_URL =
    "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Bitwise_AND";

const SOUND_CONTROL_URL = "https://shutdown.futiax.ovh/allow-sound";

let skipStarted = false;
let started = false;
let allowSound = false;

function startSkipOnce() {
    if (skipStarted) return;
    skipStarted = true;
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
        } catch (err) {
            console.error("Erreur plein écran:", err);
        }
    }
}

async function fetchSoundFlag() {
    try {
        const res = await fetch(SOUND_CONTROL_URL, { cache: "no-store" });
        const data = await res.json();
        // Si allowSound est true, on veut démutter la vidéo
        allowSound = Boolean(data.allowSound);
    } catch (err) {
        console.error("Échec du fetch sound:", err);
        allowSound = false;
    }
}

async function startExperience(e) {
    e.preventDefault();
    if (started) return;
    started = true;

    player.style.display = "block";
    startSkipOnce();

    video.muted = !allowSound;

    await video.play().catch((err) => console.error("Erreur lecture vidéo:", err));
    await enterFullscreen();
}

if (rickrollLink) {
    rickrollLink.addEventListener("click", startExperience);
}

skipBtn.addEventListener("click", () => {
    window.open(TARGET_URL, "_blank");
    player.style.display = "none";
    video.pause();
    video.currentTime = 0;
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
    started = false;
    skipStarted = false;
});

window.addEventListener("load", () => {
    fetchSoundFlag();
});
