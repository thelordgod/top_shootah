import { GameUnit } from "./game_modules/game_unit"
import {GameGrid} from './game_modules/grid';

class GameRunner {

	constructor(scene) {
		this.units = []
		this.scene = scene
		this.grid = new GameGrid(100, 100);
		this.grid.init(this.scene);
	}

	addUnit(pos, initial_behaviour) {
		let newUnit = new GameUnit(this.scene, pos)
		if (initial_behaviour != undefined) {
			newUnit.setBehaviour(initial_behaviour);
		}
		this.units.push(newUnit);
	}

	update(dt) {
		this.grid.resetCells();
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].update(dt);
			//console.log(this.units[i])
			let cell = this.grid.getCellAt(this.units[i].pos.x, this.units[i].pos.y)
			cell.setHighlight(true)
			//cell.highlight = true;
			//cell.draw()
			cell.process()
		}
	}
}

exports.GameRunner = GameRunner
