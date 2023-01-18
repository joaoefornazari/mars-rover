'use strict'

const MarsRover = require('../../Classes/MarsRover')
const MovesModel = use('App/Models/MarsRover/MarsRoverMoves')

class MarsRoverController {
	marsRover = null

	/**
	 * Set starting position and run MarsRover movements.
	 * @param {Object} args HTTP Request.
	 * @returns response
	 */
	async journey({ request, response, session }) {
		this.marsRover = new MarsRover()
		
		await this.saveMoves(request.input('moves'), session)
		await this.setStartingPosition(request.input('initialPosition'))
		await this.runMoves(request.input('moves'))		

		const position = this.marsRover.position
		return position
	}

	/**
	 * Set MarsRover' starting position.
	 * @param {Object} initialPosition A JSON object with x, y and direction data.
	 */
	async setStartingPosition(initialPosition) {
		this.marsRover.position.x = initialPosition.x
		this.marsRover.position.y = initialPosition.y
		this.marsRover.position.direction = initialPosition.direction
	}

	/**
	 * Run all moves from move list sent.
	 * @param {String} moves Sequence of moves sent.
	 */
	async runMoves(moves) {
		for (let i = 0; i < moves.length; i++) {
			const command = moves[i]
			const hasToMove = command === "M"

			// If it's not going to [M]ove, it'll spin its head to [L]eft or [R]ight.
			hasToMove ? this.marsRover.move() : this.marsRover.changeDirection(command)
		}
	}

	/**
	 * Save move sequence to database.
	 * @param {String} moveList The sequence of moves sent.
	 */
	async saveMoves(moveList, session) {
		const movesModel = new MovesModel()
		movesModel.moves = moveList

		await movesModel.save()

		session.flash({ notification: 'Moves saved.'})
	}
}

module.exports = MarsRoverController
