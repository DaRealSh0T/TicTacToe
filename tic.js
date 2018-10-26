if (!document.getElementById('canvas')) {
	let can = document.createElement('canvas');
	can.id = 'canvas';
	can.width = can.height = '900px';
	document.body.appendChild(can);
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let xOffset = 0;
let boardMatrix = new Array(3).fill().map(() => new Array(3).fill('-'));

function reset() {
	ctx.beginPath();
	ctx.clearRect(0, 0, 900, 900);
	let lineSpacing = canvas.width / 3;
	let offset = lineSpacing;
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '10';
	do {
		if (offset < 900) {
			ctx.moveTo(offset, 0);
			ctx.lineTo(offset, 900);
		} else if (offset > 1000) {
			ctx.moveTo(0, offset - 900);
			ctx.lineTo(900, offset - 900);
		}
	} while ((offset += lineSpacing) < 1800);
	ctx.stroke();
	ctx.closePath();
	boardMatrix = new Array(3).fill().map(() => new Array(3).fill('-'));
}
reset();

function drawX(x, y) {
	if (!x || !y || boardMatrix[x - 1][y - 1] != '-') return;
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '30';
	ctx.moveTo(x * 300 - 260, y * 300 - 260);
	ctx.lineTo(x * 300 - 40, y * 300 - 40);
	ctx.moveTo(x * 300 - 40, y * 300 - 260);
	ctx.lineTo(x * 300 - 260, y * 300 - 40);
	ctx.stroke();
	ctx.closePath();
	boardMatrix[x - 1][y - 1] = 'X';
	xOffset++;
}

function drawO(x, y) {
	if (!x || !y || boardMatrix[x - 1][y - 1] != '-') return;
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '30';
	ctx.arc(x * 300 - 150, y * 300 - 150, 100, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	boardMatrix[x - 1][y - 1] = 'O';
	xOffset++;
}

canvas.onclick = event => {
	const width = (height = 900);
	const x = ~~((3 * event.clientX) / width) + 1;
	const y = ~~((3 * event.clientY) / height) + 1;
	if (xOffset % 2) drawX(x, y);
	else drawO(x, y);
	checkIfWin();
};

function checkIfWin() {
	let winner = '-';
	for (let i = 0; i < 2; i++) {
		if (i) {
			for (let x = 0; x < 3; x++) {
				if (boardMatrix[x].indexOf('X') == -1 && boardMatrix[x].indexOf('-') == -1) winner = 'O';
			}
			for (let x = 0; x < 3; x++) {
				let newArr = [];
				for (let a = 0; a < 3; a++) {
					newArr.push(boardMatrix[a][x]);
				}
				if (newArr.indexOf('-') == -1 && newArr.indexOf('X') == -1) winner = 'O';
			}
			for (let x = 0; x < 2; x++) {
				let newArr = [];
				if (x) {
					newArr.push(boardMatrix[0][0]);
					newArr.push(boardMatrix[1][1]);
					newArr.push(boardMatrix[2][2]);
					if (newArr.indexOf('-') == -1 && newArr.indexOf('X') == -1) winner = 'O';
				} else {
					newArr.push(boardMatrix[2][0]);
					newArr.push(boardMatrix[1][1]);
					newArr.push(boardMatrix[0][2]);
					if (newArr.indexOf('-') == -1 && newArr.indexOf('X') == -1) winner = 'O';
				}
			}
		} else {
			for (let x = 0; x < 3; x++) {
				if (boardMatrix[x].indexOf('O') == -1 && boardMatrix[x].indexOf('-') == -1) winner = 'X';
			}
			for (let x = 0; x < 3; x++) {
				let newArr = [];
				for (let a = 0; a < 3; a++) {
					newArr.push(boardMatrix[a][x]);
				}
				if (newArr.indexOf('-') == -1 && newArr.indexOf('O') == -1) winner = 'X';
			}
			for (let x = 0; x < 2; x++) {
				let newArr = [];
				if (x) {
					newArr.push(boardMatrix[0][0]);
					newArr.push(boardMatrix[1][1]);
					newArr.push(boardMatrix[2][2]);
					if (newArr.indexOf('-') == -1 && newArr.indexOf('O') == -1) winner = 'X';
				} else {
					newArr.push(boardMatrix[2][0]);
					newArr.push(boardMatrix[1][1]);
					newArr.push(boardMatrix[0][2]);
					if (newArr.indexOf('-') == -1 && newArr.indexOf('O') == -1) winner = 'X';
				}
			}
		}
	}
	if (winner != '-') {
		const winnerText = `The winner is ${winner}!`;
		ctx.beginPath();
		ctx.clearRect(0, 0, 900, 900);
		ctx.font = '50px Arial';
		ctx.fillText(winnerText, 10, 50);
		setTimeout(reset, 5000);
	} else {
		let a = [];
		for (let i of boardMatrix) a = a.concat(i);
		if (a.indexOf('-') == -1) {
			ctx.beginPath();
			ctx.clearRect(0, 0, 900, 900);
			ctx.font = '50px Arial';
			ctx.fillText('Draw!', 10, 50);
			setTimeout(reset, 5000);
		}
	}
}
