var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currentTile;
var otherTile;

window.onload = function() {
    startGame();

    window.setInterval(function() {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100)
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./img/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

}

function dragStart() {
    currentTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {

    if (currentTile.src.includes("blanl") || otherTile.src.includes("blank")){
        return;
    }

    let currentCoordinates = currentTile.id.split("-");
    let r = parseInt(currentCoordinates[0]);
    let c = parseInt(currentCoordinates[1]);

    let otherCoordinates = otherTile.id.split("-");
    let r2 = parseInt(otherCoordinates[0]);
    let c2 = parseInt(otherCoordinates[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currentImage = currentTile.src;
        let otherImage = otherTile.src;
        currentTile.src = otherImage;
        otherTile.src = currentImage;

        let validMove = checkValid();

        if (!validMove) {
            let currentImage = currentTile.src;
            let otherImage = otherTile.src;
            currentTile.src = otherImage;
            otherTile.src = currentImage;
        }
    }
}

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.png";
                candy2.src = "./img/blank.png";
                candy3.src = "./img/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./img/blank.png";
                candy2.src = "./img/blank.png";
                candy3.src = "./img/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; c < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let index = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if(!board[r][c].src.includes("blank")) {
                board[index][c].src = board[r][c].src;
                index -= 1;
            }
        }

        for (let r = index; r >= 0; r--) {
            board[r][c].src = "./img/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./img/" + randomCandy() + ".png";
        }
    }
}