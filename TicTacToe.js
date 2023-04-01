export default function TiacTAcToe() {
	const cells = document.querySelectorAll('.cell');
	const statusText = document.querySelector('.container__tittle');
	const restarBtn = document.querySelector('.container__restartBtn');
	const board = document.querySelector('.board');
	const cellElements = document.querySelectorAll('[data-cell]');
	const winningMessageElement = document.getElementById('winningMessage');
	const winningMessageTextElement = document.querySelector(
		'[data-winning-message-text]'
	);
	const scoreCroses = document.querySelector('.score-croses');
	const scoreCircle = document.querySelector('.score-circle');
	const restarBtnScore = document.querySelector('.score-button');
	const displayContainer = document.querySelector('.container');
	const clearBoard = document.querySelector('.clear-board');

	const winCondition = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const X_CLASS = 'x';
	const CIRCLE_CLASS = 'circle';
	let circleTurn = null;
	let options = ['', '', '', '', '', '', '', '', ''];
	let currentPlayer = 'X';
	let runnig = false;
	let cellsWIn = null;
	let scoreX = 0;
	let scoreO = 0;

	function initializeGame() {
		cells.forEach(cell => {
			cell.addEventListener('click', cellClicked);
		});

		cellElements.forEach(cell => {
			cell.addEventListener('click', handleClick, { once: true });
		});
		restarBtn.addEventListener('click', restarGame);
		runnig = true;
		restarBtnScore.addEventListener('click', resetScoreOnBoard);
		clearBoard.addEventListener('click', clearBoardClick);
	}
	function handleClick(e) {
		const dataCell = e.target;
		const currenClass = circleTurn ? X_CLASS : CIRCLE_CLASS;
		placeMark(dataCell, currenClass);
	}
	function placeMark(dataCell, currenClass) {
		cells.forEach(cell => {
			dataCell.classList.add(currenClass);
		});
	}
	function swapTurns() {
		circleTurn = !circleTurn;
	}
	function setBoardHoverClass() {
		board.classList.remove(X_CLASS);
		board.classList.remove(CIRCLE_CLASS);

		if (circleTurn) {
			board.classList.add(CIRCLE_CLASS);
		} else {
			board.classList.add(X_CLASS);
		}
	}
	function cellClicked() {
		const cellIndex = this.getAttribute('cellIndex');

		if (options[cellIndex] != '' || !runnig) {
			return;
		}
		swapTurns();
		setBoardHoverClass();
		updateCell(this, cellIndex);
		changePlayer();
		checkWinner();
	}

	function updateCell(cell, index) {
		options[index] = currentPlayer;
	}
	function changePlayer() {
		if (circleTurn) {
			currentPlayer = 'O';
		} else {
			currentPlayer = 'X';
		}
		statusText.textContent = `${currentPlayer} 's Turn`;
	}
	function checkWinner() {
		let roundWon = false;
		let winnerIndicator = new Array(3).fill(null);
		for (let i = 0; i < winCondition.length; i++) {
			const condition = winCondition[i];
			const cellA = options[condition[0]];
			const cellB = options[condition[1]];
			const cellC = options[condition[2]];

			if (cellA == '' || cellB == '' || cellC == '') {
				continue;
			}
			if (cellA == cellB && cellB == cellC) {
				roundWon = true;
				cellsWIn = condition;

				break;
			}
		}

		if (roundWon) {
			incrementScore(currentPlayer);
			updateScoreOnBoard();
			winningMessageTextElement.innerText = `${
				circleTurn ? "X 's" : "O 's"
			} Wins!`;
			winningMessageElement.classList.add('show');
			displayContainer.classList.add('blur');
			runnig = false;
		} else if (!options.includes('')) {
			winningMessageTextElement.innerText = `Draw!`;
			winningMessageElement.classList.add('show');
			displayContainer.classList.add('blur');
			runnig = false;
		}
	}
	function incrementScore(e) {
		if (e == 'O') {
			scoreX++;
		} else {
			scoreO++;
		}
	}
	function updateScoreOnBoard() {
		if (Number(scoreCroses.textContent != scoreX)) {
			scoreCroses.textContent = `  ${scoreX}`;
		}
		if (Number(scoreCircle.textContent != scoreO)) {
			scoreCircle.textContent = `  ${scoreO}`;
		}
	}
	function resetScoreOnBoard() {
		scoreCircle.textContent = '0';
		scoreCroses.textContent = '0';
		scoreX = 0;
		scoreO = 0;
	}
	function clearBoardClick() {
		restarGame();
	}
	function restarGame() {
		currentPlayer = 'X';
		options = ['', '', '', '', '', '', '', '', ''];
		cellElements.forEach(cell => {
			cell.classList.remove(X_CLASS);
			cell.classList.remove(CIRCLE_CLASS);
			cell.removeEventListener('click', handleClick);
			cell.addEventListener('click', handleClick, { once: true });
		});

		setBoardHoverClass();
		displayContainer.classList.remove('blur');
		winningMessageElement.classList.remove('show');
		runnig = true;
		circleTurn = null;
		statusText.textContent = 'tic tac toe';
	}
	initializeGame();
}
