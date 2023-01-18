/*
	When user asks to go right, MarsRover will move clockwise.
	N -> E -> S -> W

	If user asks to go left, MarsRover will move counter-clockwise.
	N <- E <- S <- W
*/
const MAX_SIZE = 99

class MarsRover {
	position = {
		x: 0,
		y: 0,
		direction: "N"
	}

	/* OTHER ACTIONS *****************/

	/**
	 * Spins MarsRover's head, changing the direction it's facing.
	 * @param {String} spin "L" or "R", indicating its spin direction.
	 */
	changeDirection (spin) {
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

		const direction = spin === "L" ? "left" : "right"
		this.position.direction = DIRECTION[this.position.direction][direction]
	}

	/**
	 * Move MarsRover to left or right.
	 */
	move () {
		const direction = this.position.direction
		const actions = {
			N: () => {
				const y = this.getPositionY
				this.position.y = y + 1 > MAX_SIZE ? y + 1 : y
			},
			S: () => {
				const y = this.getPositionY
				this.position.y = y - 1 > 0 ? y - 1 : y
			},
			W: () => {
				const x = this.getPositionX
				this.position.x = x - 1 < 0 ? x - 1 : x
			},
			E: () => {
				const x = this.getPositionX
				this.position.x = x + 1 > MAX_SIZE ? x + 1 : x
			}
		}

		const go = actions[direction]
		go()
	}

}

module.exports = MarsRover