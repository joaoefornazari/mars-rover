'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarsRoverMovesSchema extends Schema {
  up () {
    this.create('mars_rover_moves', (table) => {
      table.increments()
      table.string('moves')
      table.timestamps()
    })
  }

  down () {
    this.drop('mars_rover_moves')
  }
}

module.exports = MarsRoverMovesSchema
