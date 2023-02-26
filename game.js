import { GameUnit } from "./game_modules/game_unit"
import {GameGrid} from './game_modules/grid';

class GameRunner {

	constructor(scene) {
		this.units = []
		this.scene = scene
		this.grid = new GameGrid(100, 100);
		this.grid.init(this.scene);
		this.cam = scene.cameras.main
		this.cam.setZoom(1);
	}

	addUnit(pos, speed, initial_behaviour) {
		let newUnit = new GameUnit(this.scene, pos, speed)
		if (initial_behaviour != undefined) {
			newUnit.setBehaviour(initial_behaviour);
		}
		this.units.push(newUnit);
		return newUnit
	}

	setCamera(pos) {
        this.cam.centerOn(pos.x, pos.y);
	}

	update(dt) {
		this.grid.resetCells();
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].update(dt);
			let cell = this.grid.getCellAt(this.units[i].pos.x, this.units[i].pos.y)
			cell.setHighlight(true)
			cell.process()
		}
	}
}

exports.GameRunner = GameRunner
