import {PathFinder} from './path_finder'

class Behaviour { 
	constructor() { }
	process(unit) { }
	moveUnitDirection(unit, dir) {
		if (dir != undefined && unit != undefined) {
			unit.pos.x += (dir.x) * unit.maxSpeed;
			unit.pos.y += (dir.y) * unit.maxSpeed;
		}
	}
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
		super.moveUnitDirection(unit, {x: dPos.x / dLen, y: dPos.y / dLen})
	}
}

class MoveToUnit extends Behaviour {
	constructor(target_unit) {
		super()
		this.targetUnit = target_unit;
		this.targetPos = target_unit.pos;
		this.successDistance = 10;
	}

	process(unit) {
		super.process(unit)
		this.targetPos = this.targetUnit.pos;
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

		super.moveUnitDirection(unit, {x: dPos.x / dLen, y: dPos.y / dLen})

	}
}

class MoveAlongPath extends Behaviour {
	constructor(path, grid) {
		super()
		this.path = [...path]
		this.targetPos = undefined
		this.successDistance = 10;
		this.grid = grid
	}

	process(unit) {
		super.process(unit)

		if (this.targetPos == undefined) {
			if (this.path.length > 0) {
				let nextCell = this.path.pop()
				this.targetPos = this.grid.getCellWorldPoint(nextCell);
				console.log("Popping next cell")
			} else {
				unit.setBehaviour(new Stationary());
				return
			}
		}

		let unitPos = unit.pos;
		let dPos = {x: this.targetPos.x - unitPos.x, y: this.targetPos.y - unitPos.y}
		let dLen = Math.sqrt(dPos.x * dPos.x + dPos.y * dPos.y)

		if (this.successDistance > dLen) {
			if (this.path.length > 0) {
				let nextCell = this.path.pop()
				this.targetPos = this.grid.getCellWorldPoint(nextCell);
				console.log("Popping next cell left:" + this.path.length)
			} else {
				unit.setBehaviour(new Stationary());
				return
			}
		}

		if (dPos.x == 0 || dPos.y == 0) {
			return;
		}

		super.moveUnitDirection(unit, {x: dPos.x / dLen, y: dPos.y / dLen})
	}
}

class WanderAround extends Behaviour {
	constructor(grid) {
		super()
		this.path = PathFinder.getPath(grid, {x: Math.random() * 600.0, y: Math.random() * 600.0}, {x: Math.random() * 600.0, y: Math.random() * 600.0})
		this.targetPos = undefined
		this.successDistance = 10;
		this.grid = grid
	}

	process(unit) {
		super.process(unit)

		if (this.targetPos == undefined) {
			if (this.path.length > 0) {
				let nextCell = this.path.pop()
				this.targetPos = this.grid.getCellWorldPoint(nextCell);
				console.log("Popping next cell")
			} else {
				unit.setBehaviour(new Stationary());
				return
			}
		}

		let unitPos = unit.pos;
		let dPos = {x: this.targetPos.x - unitPos.x, y: this.targetPos.y - unitPos.y}
		let dLen = Math.sqrt(dPos.x * dPos.x + dPos.y * dPos.y)

		if (this.successDistance > dLen) {
			if (this.path.length > 0) {
				let nextCell = this.path.pop()
				this.targetPos = this.grid.getCellWorldPoint(nextCell);
				console.log("Popping next cell left:" + this.path.length)
			} else {
				this.path = PathFinder.getPath(this.grid, unitPos, {x: Math.random() * 600.0, y: Math.random() * 600.0})
				return
			}
		}

		if (dPos.x == 0 || dPos.y == 0) {
			return;
		}

		super.moveUnitDirection(unit, {x: dPos.x / dLen, y: dPos.y / dLen})
	}
}


exports.Stationary = Stationary
exports.MoveToTarget = MoveToTarget
exports.MoveAlongPath = MoveAlongPath
exports.WanderAround = WanderAround
exports.MoveToUnit = MoveToUnit
