import { Stationary, MoveToTarget } from './behaviour'

class GameUnit {
	constructor(scene, start_pos, speed) {
		this.pos = start_pos;
		this.scene = scene;
		this.size = 32;
		this.drawable = this.scene.add.image(this.pos.x, this.pos.y, 'unit');
		this.drawable.setOrigin(0.5, 0.5);
		this.drawable.setDisplaySize(this.size, this.size);

		this.maxSpeed = speed;

		this.behaviour = undefined;
	}

	updateDrawable(scene) {
	}

	setBehaviour(behaviour) {
		this.behaviour = behaviour;
	}

	update(dt) {
		if (this.behaviour != undefined) {
			this.behaviour.process(this);
		}
		this.drawable.x = this.pos.x;
		this.drawable.y = this.pos.y;
	}
}

exports.GameUnit = GameUnit
