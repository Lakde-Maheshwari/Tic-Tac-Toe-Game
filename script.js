let boxes = document.querySelectorAll(".box")
let resetbutton = document.querySelector(".reset-btn")
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turnO = true; // player x and player o

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const winpatterns = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

var count = 0;

const checkGameDraw = () => {
    if (count === 9) {
        msg.innerText = `Tie Game click on New Game to Start Again`;
        msgContainer.classList.remove("hide")
        disableBoxes();
    }
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked")
        if (turnO) {
            box.style.color = "gray"
            box.innerText = "O"
            turnO = false;
        }
        else {
            box.innerText = "X"
            turnO = true;
        }
        count++;
        box.disabled = true;
        checkGameDraw();
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations..! Winner is ${winner}`;
    msgContainer.classList.remove("hide")
    disableBoxes();
}



const checkWinner = () => {

    if (count === 9) {
        console.log(`Tie Game click on Reset Game to Start Again..!`)
    }
    for (let pattern of winpatterns) {
       
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);




