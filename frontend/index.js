// Variables for DOM elements and other global variables

const bingoBoard = document.getElementById("bingo-board");
const generateBoardBtn = document.querySelector("#generate-board-btn");
const clearBtn = document.getElementById("clear-btn");
const bingoWin = document.getElementById("bingo-win");
const winOkBtn = document.getElementById("win-ok-btn");
const phrase1 = document.querySelector("#phrase1");
const divsForPhrases = Array.from(bingoBoard.children);
const markedPhrases = []


// config array for phrases

const phrases = ["Hi, who just joined?", "Can you email that to everyone?", "___ , are you there?", "(Sound of someone typing, possibly with a hammer)",
	"Can everyone go on mute please", "(Loud, painful echo)", "(Child or animal noise)", "(Someone not muted during a side conversation)", "Hi, can you hear me?",
	"I'm sorry, I was on mute", "Sorry, go ahead", "Can everyone see my screen?", "Sorry, I was having connection issues",
	"So (faded out) I can (interrupted connection) by (cuts out), ok?", "Sorry, I'm late, I had another meeting", "I have a hard stop at..."]


// Function to handle click events on divs

function handleClickOnDiv(e) {
	let div = e.target;
	div.classList.toggle("marked");

			if (markedPhrases.indexOf(div.dataset.id) === -1) {
				console.log(div.dataset.id)
				markedPhrases.push(div.dataset.id);
				checkIfWin()
			} else {
				markedPhrases.splice(markedPhrases.indexOf(div.dataset.id), 1)
			}
			console.log(markedPhrases)
}


// Clear button

clearBtn.addEventListener("click", () => {
	divsForPhrases.forEach(div => {
		div.innerText = "";
		div.classList.remove("marked");
		div.removeEventListener("click", handleClickOnDiv);
	});
	markedPhrases.splice(0,markedPhrases.length);
})

// Generate Bingo Board Button

generateBoardBtn.addEventListener("click", () => {

	if(divsForPhrases[0].innerHTML !== "") {
		alert("Please clear the board before generating a new on!")
	} else {
	// Fisher-Yates shuffle of phrases array
	for (let i = phrases.length - 1; i > 0; i--) {
		let randomNewIndex = Math.floor(Math.random() * (i + 1))

		let movedElement = phrases[i];
		phrases[i] = phrases[randomNewIndex];
		phrases[randomNewIndex] = movedElement;
	};

	divsForPhrases.forEach(div => {
		div.innerText = phrases[divsForPhrases.indexOf(div)];
		//Event handler to mark / unmark phrase divs on click
		div.addEventListener("click", handleClickOnDiv);
	});
}
});

// Win ok button

winOkBtn.addEventListener("click", () => {
	document.getElementById("content-container").style.opacity = 1;
	bingoWin.style.visibility = "hidden";
	divsForPhrases.forEach(div => {
		div.removeEventListener("click", handleClickOnDiv);
	});
})

// Function to check if player has bingo and to display win banner

function checkIfWin() {
	let hasBingoHorizontal = false;
	let hasBingoVertical = false;
	let hasBingoDiagonal = false;
	let winningPhrases = []

	if (markedPhrases.length >= 4) {
		if (markedPhrases.includes("a1") && markedPhrases.includes("b1") && markedPhrases.includes("c1") && markedPhrases.includes("d1")) {
			hasBingoHorizontal = true;
			winningPhrases.push("a1", "b1", "c1", "d1")
		} else if (markedPhrases.includes("a2") && markedPhrases.includes("b2") && markedPhrases.includes("c2") && markedPhrases.includes("d2")) {
			hasBingoHorizontal = true;
			winningPhrases.push("a2", "b2", "c2", "d2")
		} else if (markedPhrases.includes("a3") && markedPhrases.includes("b3") && markedPhrases.includes("c3") && markedPhrases.includes("d3")) {
			hasBingoHorizontal = true;
			winningPhrases.push("a3", "b3", "c3", "d3")
		} else if (markedPhrases.includes("a4") && markedPhrases.includes("b4") && markedPhrases.includes("c4") && markedPhrases.includes("d4")) {
			hasBingoHorizontal = true;
			winningPhrases.push("a4", "b4", "c4", "d4")
		} else {
			hasBingoHorizontal = false
		}

		if (markedPhrases.includes("a1") && markedPhrases.includes("a2") && markedPhrases.includes("a3") && markedPhrases.includes("a4")) {
			hasBingoVertical = true;
			winningPhrases.push("a1", "a2", "a3", "a4")
		} else if (markedPhrases.includes("b1") && markedPhrases.includes("b2") && markedPhrases.includes("b3") && markedPhrases.includes("b4")) {
			hasBingoVertical = true;
			winningPhrases.push("b1", "b2", "b3", "b4")
		} else if (markedPhrases.includes("c1") && markedPhrases.includes("c2") && markedPhrases.includes("c3") && markedPhrases.includes("c4")) {
			hasBingoVertical = true;
			winningPhrases.push("c1", "c2", "c3", "c4")
		} else if (markedPhrases.includes("d1") && markedPhrases.includes("d2") && markedPhrases.includes("d3") && markedPhrases.includes("d4")) {
			hasBingoVertical = true;
			winningPhrases.push("d1", "d2", "d3", "d4")
		} else {
			hasBingoVertical = false
		}

		if (markedPhrases.includes("a1") && markedPhrases.includes("b2") && markedPhrases.includes("c3") && markedPhrases.includes("d4")) {
			hasBingoDiagonal = true;
			winningPhrases.push("a1", "b2", "c3", "d4")
		} else if (markedPhrases.includes("a4") && markedPhrases.includes("b3") && markedPhrases.includes("c2") && markedPhrases.includes("d1")) {
			hasBingoDiagonal = true;
			winningPhrases.push("a4", "b3", "c2", "d1")
		} else {
			hasBingoDiagonal = false;
		}
	}

	// Try to have winning Phrases marked magenta
	if (hasBingoHorizontal || hasBingoVertical || hasBingoDiagonal) {
		// winningPhrases.forEach(phrase => {
		// 	let winningPhrase = divsForPhrases.filter(div => {
		// 		return div.dataset.id === phrase;
		// 	})
		// 	console.log(winningPhrase)
			
		// 	winningPhrase[0].style.backgroundColor = "blue";
		// })
		setTimeout(showBingoWin, 200)
	}

}

function showBingoWin() {
	document.getElementById("content-container").style.opacity = 0.4;
		bingoWin.style.visibility = "visible";
}