class Behaviour { 
	constructor() { }
	process(unit) { }
}

class Stationary extends Behaviour {
	constructor() {
		super()
	}

	process(unit) {
		super.process(unit)
	}
}

class MoveToTarget extends Behaviour {
	constructor(target_pos) {
		super()
		this.targetPos = target_pos;
		this.successDistance = 10;
	}

	process(unit) {
		super.process(unit)
		let unitPos = unit.pos;
		let dPos = {x: this.targetPos.x - unitPos.x, y: this.targetPos.y - unitPos.y}
		let dLen = Math.sqrt(dPos.x * dPos.x + dPos.y * dPos.y)

		if (this.successDistance > dLen) {
			unit.setBehaviour(new Stationary());
			return
		}

		if (dPos.x == 0 || dPos.y == 0) {
			return;
		}
		unit.pos.x += dPos.x / dLen;
		unit.pos.y += dPos.y / dLen;

	}
}


exports.Stationary = Stationary
exports.MoveToTarget = MoveToTarget
