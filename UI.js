const ui = document.getElementById("ui");
const slider = document.getElementById("sizeSlider");
const box = document.getElementById("myBox");

// Marker events
const marker = document.getElementById("markerHiro");
marker.addEventListener("markerFound", () => {
    console.log("Marker détecté !");
    ui.style.display = "block"; // afficher l'UI
});
marker.addEventListener("markerLost", () => {
    console.log("Marker perdu !");
    ui.style.display = "none"; // masquer l'UI
});

// Slider -> change la taille en temps réel
slider.addEventListener("input", (e) => {
    const size = e.target.value;
    box.setAttribute("scale", `${size} ${size} ${size}`);
});

// Palette de couleurs -> change la couleur immédiatement
document.querySelectorAll("#colors button").forEach(btn => {
    btn.addEventListener("click", () => {
    const color = btn.dataset.color;
    box.setAttribute("material", "color", color);
    });
});