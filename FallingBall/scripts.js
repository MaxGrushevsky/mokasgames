const game = document.getElementById("game");
const character = document.getElementById("character");
let interval;
let both = 0;
let counter = 0;
let currentBlocks = [];

function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    if (left > 0) {
        character.style.left = left - 2 +  "px";
    }
};

function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    if (left < 380 ) {
        character.style.left = left + 2 +  "px";
    }
};

document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1)
        }
    
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1)
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

const blocks = setInterval(function() {
    const lastBlock = document.getElementById("block" + (counter - 1));

    if (counter > 0) {
        var lastBlockPosition = parseInt(window.getComputedStyle(lastBlock).getPropertyValue("top"));
    }

    if (lastBlockPosition < 400 || counter == 0) {
        const block = document.createElement("div");
        const hole = document.createElement("div");

        let random = Math.floor((Math.random() * 360));

        block.setAttribute("class", "block");
        block.setAttribute("id", "block" + counter);

        hole.setAttribute("class", "hole");
        hole.setAttribute("id", "hole" + counter);

        game.appendChild(block);
        game.appendChild(hole);

        block.style.top = (lastBlockPosition + 100) + "px";
        hole.style.top = (lastBlockPosition + 100) + "px";
        hole.style.left = random + "px";

        currentBlocks.push(counter);
        counter++; 
    }

    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let drop = 0;

    if (characterTop <= 0) {
        alert("Game Over! Score: " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }

    for (let i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];

        const currentBlock = document.getElementById("block" + current);
        const currentHole = document.getElementById("hole" + current);

        const currentBlockPosition = parseFloat(window.getComputedStyle(currentBlock).getPropertyValue("top"));
        const currentHoleLeft = parseFloat(window.getComputedStyle(currentHole).getPropertyValue("left"));

        currentBlock.style.top = (currentBlockPosition - 0.5) + "px";
        currentHole.style.top = (currentBlockPosition - 0.5) + "px";

        if (currentBlockPosition < -20) {
            currentBlocks.shift();
            currentBlock.remove();
            currentHole.remove();
        }

        if (currentBlockPosition - 20 < characterTop && currentBlockPosition > characterTop) {
            drop++;
            if (currentHoleLeft <= characterLeft && currentHoleLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }

    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = (characterTop + 2) + "px";
        }
    } else {
        character.style.top = (characterTop - 0.5) + "px";
    }
}, 1)