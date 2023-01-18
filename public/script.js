/* LISTENERS */
const roverData = {
	moves: "",
	initialPosition: {
		x: 0,
		y: 0,
		direction: ""
	}
}

function formatInput(input, text) {
	if (text.length > 1) {
		text = text[1]
	}

	text = text.toUpperCase()
	if (text === "") return text

	if (input.id === "direction-position") {
		if (!text.match('/N|S|W|E|\t|\s/')) text = 'N'
	}

	input.value = text

	return text
}

function addInitialPositionData(event, data) {
	const input = event.target
	const text = formatInput(input, input.value)

	if (data === 'X') roverData.initialPosition.x = text
	if (data === 'Y') roverData.initialPosition.y = text
	if (data === 'DIR') roverData.initialPosition.direction = text
}

function addMove(move) {
	roverData.moves += move
	showMoveHistory()

	const buttonSubmit = document.querySelector('.submit')
	if (buttonSubmit.hasAttribute('disabled')) buttonSubmit.removeAttribute('disabled')
}

function cleanMoves() {
	roverData.moves = ''
	document.querySelector('#move-sequence').textContent = ''
}

function showMoveHistory() {
	const moveSequenceText = document.querySelector('#move-sequence')
	moveSequenceText.textContent = roverData.moves
}

async function sendMoves() {
	try {
		const res = await axios.post('/marsrover/go', roverData)
		const position = res.data

		const userOutputArea = document.querySelector('.user-output')
		if (!userOutputArea.classList.contains('hidden')) userOutputArea.classList.add('hidden')

		showFinalPosition(position)
		cleanMoves()

	} catch (ex) {
		console.log(ex)
	}
}

function showFinalPosition(position) {

	const userOutputArea = document.querySelector('.user-output')
	userOutputArea.classList.remove('hidden')
		
	const finalPosition = document.querySelector('.final-position-output')
	finalPosition.textContent = `${position.x} ${position.y} ${position.direction}`

}