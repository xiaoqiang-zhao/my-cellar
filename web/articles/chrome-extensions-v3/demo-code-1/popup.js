let changeColor = document.getElementById("changeColor");
let backgroundColor;

chrome.storage.sync.get("color", ({
    color
}) => {
    backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    document.getElementById('text-container').style.backgroundColor = backgroundColor;
});
