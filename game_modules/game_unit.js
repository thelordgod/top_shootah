import { Stationary, MoveToTarget } from './behaviour'

class GameUnit {
	constructor(scene, start_pos) {
		this.pos = start_pos;
		this.scene = scene;
		this.size = 32;
		this.drawable = scene.add.image(this.pos.x, this.pos.y, 'unit');
		this.drawable.setOrigin(0.5, 0.5);
		this.drawable.setDisplaySize(this.size, this.size);

		this.maxSpeed = 1.0;

		this.behaviour = new Stationary();
	}

	updateDrawable(scene) {
	}

	setBehaviour(behaviour) {
		this.behaviour = behaviour;
	}

	update(dt) {
		this.behaviour.process(this)
		this.drawable.x = this.pos.x;
		this.drawable.y = this.pos.y;
	}
}

exports.GameUnit = GameUnit
