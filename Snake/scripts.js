const game = document.getElementById("game");
const SNAKE_SPEED = 2;
const EXPANSION_RATE = 1;
const GRID_SIZE = 21;
const snakeBody = [{x: 11, y: 11}];
let lastRenderTime = 0;
let newCells = 0;
let food = { x: 10, y: 1 };
let inputDirection = { x: 0, y: 0 };
let lastInpurDirection = { x: 0, y: 0 };
let gameOver = false;
let counter = 0;

function main (currentTime) {
    if (gameOver) {
        if(confirm("Game Over! Score: " + counter)) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; 

    if (secondsSinceLastRender < (1 / SNAKE_SPEED)) return
    lastRenderTime = currentTime;

    snakeUpdate();
    foodUpdate();
    
    checkDeath();

    snakeDraw();
    foodDraw();
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (lastInpurDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (lastInpurDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (lastInpurDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (lastInpurDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }

    lastInpurDirection = inputDirection;
});

function snakeUpdate(){
    addCells();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function snakeDraw() {
    game.innerHTML = "";
    snakeBody.forEach(cell => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = cell.y;
        snakeElement.style.gridColumnStart = cell.x;
        snakeElement.classList.add("snake");
        game.appendChild(snakeElement);
    })
}

function foodUpdate() {
    if (onSnake(food)) {
        newCells += EXPANSION_RATE;
        food = getRandomFoodPosition();
        counter++;
    }
}

function foodDraw() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    game.appendChild(foodElement);
}

function addCells() {
    for (let i = 0; i < newCells; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newCells = 0; 
}

function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((cell, index) => {
        if (ignoreHead && index === 0) return false ;
        return equalPositios(cell, position);
    })
}

function equalPositios(positionA, positioB) {
    return positionA.x === positioB.x && positionA.y === positioB.y;
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1 ,
    }
}

function checkDeath() {
    gameOver = outsideGrid(snakeBody[0]) || onSnake(snakeBody[0], { ignoreHead: true });
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}
 