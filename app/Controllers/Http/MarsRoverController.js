'use strict'

const { MarsRover } = require('App/Classes/MarsRover')
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
		
		await this.saveMoves(request.input('moves'))
		await this.setStartingPosition(request.input('initialPosition'))
		await this.runMoves(request.input('moves'))		

		const position = marsRover.getAllPositionData()
		return response.status(200).send(position)
	}

	/**
	 * Set MarsRover' starting position.
	 * @param {Object} initialPosition A JSON object with x, y and direction data.
	 */
	async setStartingPosition(initialPosition) {
		this.marsRover.setPositionX(initialPosition.x)
		this.marsRover.setPositionY(initialPosition.y)
		this.marsRover.setPositionDirection(initialPosition.direction)
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
			hasToMove ? marsRover.move() : marsRover.changeDirection(command)
		}
	}

	/**
	 * Save move sequence to database.
	 * @param {String} moveList The sequence of moves sent.
	 */
	async saveMoves(moveList) {
		const moves = new MovesModel()
		moves.list = moveList

		await moves.save()

		session.flash({ notification: 'Moves saved.'})
	}
}

module.exports = MarsRoverController
