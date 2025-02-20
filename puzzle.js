const rows = 4, cols = 4;
const puzzleContainer = document.getElementById("puzzle-container");
const shuffleBtn = document.getElementById("shuffle-btn");
const nextGameBtn = document.createElement("button"); // Create Next Game Button
const imageSrc = "images/IMG_8670.JPG"; // Your puzzle image

let pieces = [];

// Create shuffled puzzle
function createPuzzle() {
    puzzleContainer.innerHTML = "";
    pieces = [];
    nextGameBtn.style.display = "none"; // Hide the button initially

    let positions = [...Array(16).keys()]; // Array from 0-15

    do {
        positions.sort(() => Math.random() - 0.5);
    } while (!isSolvable(positions));

    positions.forEach((pos, i) => {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.setAttribute("draggable", true);
        piece.dataset.correctIndex = pos;
        piece.dataset.currentIndex = i;

        let x = (pos % cols) * -158; // 158px per piece width
        let y = Math.floor(pos / cols) * -118; // 118px per piece height
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundPosition = `${x}px ${y}px`;

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);
        piece.addEventListener("dragend", dragEnd);

        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    });
}

// Drag and Drop Functions
let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
    setTimeout(() => (event.target.style.opacity = "0.5"), 0);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    
    if (event.target.classList.contains("puzzle-piece") && event.target !== draggedPiece) {
        let draggedIndex = draggedPiece.dataset.currentIndex;
        let targetIndex = event.target.dataset.currentIndex;

        // Swap positions
        let tempX = draggedPiece.style.backgroundPosition;
        draggedPiece.style.backgroundPosition = event.target.style.backgroundPosition;
        event.target.style.backgroundPosition = tempX;

        // Update dataset
        draggedPiece.dataset.currentIndex = targetIndex;
        event.target.dataset.currentIndex = draggedIndex;

        checkWin();
    }
}

function dragEnd(event) {
    event.target.style.opacity = "1";
}

// Check if the puzzle is solved
function checkWin() {
    if (pieces.every(piece => piece.dataset.correctIndex == piece.dataset.currentIndex)) {
        nextGameBtn.style.display = "block"; // Show the button
    }
}

// Check if the puzzle is solvable
function isSolvable(positions) {
    let inversions = 0;
    for (let i = 0; i < positions.length - 1; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            if (positions[i] > positions[j] && positions[i] !== 15 && positions[j] !== 15) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}

// Shuffle the puzzle
shuffleBtn.addEventListener("click", createPuzzle);

// Create "Next Game" Button
nextGameBtn.textContent = "Next Game";
nextGameBtn.style.display = "none"; // Hidden initially
nextGameBtn.style.marginTop = "20px";
nextGameBtn.style.padding = "10px 20px";
nextGameBtn.style.backgroundColor = "#ff69b4";
nextGameBtn.style.color = "white";
nextGameBtn.style.border = "none";
nextGameBtn.style.borderRadius = "5px";
nextGameBtn.style.cursor = "pointer";
nextGameBtn.style.fontSize = "16px";

// Redirect on click
nextGameBtn.addEventListener("click", () => {
    window.location.href = "guess the moment/question1.html"; // Change to your next game file
});

// Append button to page
document.body.appendChild(nextGameBtn);

// Initialize
createPuzzle();
