/*
	When user asks to go right, MarsRover will move clockwise.
	N -> E -> S -> W

	If user asks to go left, MarsRover will move counter-clockwise.
	N <- E <- S <- W
*/

const DIRECTION = {
	N: {
		left: "W",
		right: "E",
	},
	S: {
		left: "E",
		right: "W",
	},
	W: {
		left: "S",
		right: "N"
	},	
	E: {
		left: "N",
		right: "S"
	}
}

const MAX_SIZE = 99

class MarsRover {
	position = {
		x: 0,
		y: 0,
		direction: "N"
	}

	constructor() {
		
	}

	/* GET METHODS *******************/

	/**
	 * @returns {String} The MarsRover' position direction.
	 */
	get getPositionDirection() {
		return this.position.direction
	}

	/**
	 * @returns {String} The MarsRover' X position coordinate.
	 */
	get getPositionX() {
		return this.position.x
	}

	/**
	 * @returns {String} The MarsRover' Y position coordinate.
	 */
	get getPositionY() {
		return this.position.y
	}

	/**
	 * @returns {Object} All MarsRover' position data.
	 */
	get getAllPositionData() {
		return this.position
	}

	/* SET METHODS *******************/

	/**
	 * Sets a new value to X coordinate.
	 * @param {Number} x The new X coordinate.
	 */
	set setPositionX(x) {
		this.position.x = x
	}

	/**
	 * Sets a new value to Y coordinate.
	 * @param {Number} y The new Y coordinate.
	 */
	set setPositionY(y) {
		this.position.y = y
	}

	/**
	 * Sets a new value to MarsRover' direction.
	 * @param {String} direction The new direction value.
	 */
	set setPositionDirection(direction) {
		this.position.direction = direction
	}

	/* OTHER ACTIONS *****************/

	/**
	 * Spins MarsRover's head, changing the direction it's facing.
	 * @param {String} spin "L" or "R", indicating its spin direction.
	 */
	changeDirection (spin) {
		const direction = spin === "L" ? "left" : "right"
		this.setPositionDirection(DIRECTION[this.getPositionDirection][direction])
	}

	/**
	 * Move MarsRover to left or right.
	 */
	move () {
		const direction = this.getPositionDirection()
		if (direction === "N" || direction === "S") {
			moveYAxis(direction)
		}
		if (direction === "W" || direction === "E") {
			moveXAxis(direction)
		}
	}

	/**
	 * Move MarsRover on the X axis according to the direction it's facing.
	 * If the movement would take it out of map's borders, it doesn't move.
	 * @param {String} direction W (west) or E (east).
	 */
	moveXAxis(direction) {
		const actions = {
			W: () => {
				const x = this.getPositionX
				this.setPositionX(x - 1 < 0 ? x - 1 : x)
			},
			E: () => {
				const x = this.getPositionX
				this.setPositionX(x + 1 > MAX_SIZE ? x + 1 : x)
			}
		}

		const go = actions[direction]
		go()
	}

	/**
	 * Move MarsRover on the Y axis according to the direction it's facing.
	 * If the movement would take it out of map's borders, it doesn't move.
	 * @param {String} direction N (north) or S (south).
	 */
	moveYAxis(direction) {
		const actions = {
			N: () => {
				const y = this.getPositionY
				this.setPositionY(y + 1 > MAX_SIZE ? y + 1 : y)
			},
			S: () => {
				const y = this.getPositionY
				this.setPositionY(y - 1 > 0 ? y - 1 : y)
			}
		}

		const go = actions[direction]
		go()
	}

}

module.exports = MarsRover