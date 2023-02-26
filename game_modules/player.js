import { GameUnit } from './game_unit'

class Player extends GameUnit {
	constructor(game, start_pos) {
		super(game.scene, start_pos, 1.0);
		this.nextMove = {x: 0, y: 0}
	}

	update(dt) {
		super.update(dt);
		this.pos.x += this.nextMove.x * dt;
		this.pos.y += this.nextMove.y * dt;
		this.nextMove.x = 0;
		this.nextMove.y = 0;
	}

	move(step_vector) {
		this.nextMove = step_vector
	}
}

exports.Player = Player
