let boxes = document.querySelectorAll(".box")
let resetbutton = document.querySelector(".reset-btn")
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turnO = true; // player x and player o

// making reset game button functional
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}


// For storing winning patterns we make the use of 2d Arrays
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

// jaise hi buttons pr click ho kuch hona chahiye i.e hum event listeners add krna
// chahte hai
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked")
        if (turnO) {
            box.style.color = "gray"
            box.innerText = "O"
            // kisi bhi box ko sirf ek baar click kr skte hai do baar nhi fir wo to fair game nhi rhega
            // to jaise hi hum button ko ek baar click kr diya to fir usko disable kr do
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

// after one contestant won the game disable all other buttons such that the game will not be continued
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
// after reset button is clicked we have to enable these boxes again
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

// for each step the thing that we have to check is that
// is anyone winning that game because of that checkmark

//for that sake here's the function to check
// for that this function checks all the winnng patterns in the 2d array that we have declared

const checkWinner = () => {

    if (count === 9) {
        console.log(`Tie Game click on Reset Game to Start Again..!`)
    }
    for (let pattern of winpatterns) {
        // console.log(pattern[0], pattern[1], pattern[2])
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // )
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

// newGame and Reset Game buttons are now function 

newGameBtn.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);




