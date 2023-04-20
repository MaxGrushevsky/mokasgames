const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let counter = 0;

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function() {
            dino.classList.remove("jump");
        }, 300)
    }
};

const isAlive = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over! Scrore: " + (counter));
        clearInterval(isAlive);
        location.reload();
    }

    if (cactusLeft === 0) {
        counter++;
    }
}, 10)

document.addEventListener("keydown", function(event) {
    jump();
});
