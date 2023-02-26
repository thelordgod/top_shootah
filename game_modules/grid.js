
let sqrtTwo = Math.sqrt(2)

class GameGridCell{
	constructor (pos_x, pos_y, scene) {
		this.px = pos_x
		this.py = pos_y
		this.wsize = 32
		this.scene = scene
		this.highlight = false
		this.mustRedraw = true
	}

	draw() {
		const graphics = this.scene.add.graphics();
		let bx = this.px * this.wsize;
		let by = this.py * this.wsize;

		if (this.highlight) {
			graphics.lineStyle(1, 0xffffff, 1);
			graphics.strokeRect(bx, by, this.wsize, this.wsize);
		} else {
			graphics.lineStyle(1, 0x00ff00, 1);
			graphics.strokeRect(bx, by, this.wsize, this.wsize);
		}

		//this.highlight = false
		//this.mustRedraw = true;
	}

	setHighlight(hlight) {
		if (this.highlight != hlight) {
			this.mustRedraw = true;
		}
		this.highlight = hlight
	}

	process() {
		if (this.mustRedraw) {
			this.draw()
			this.mustRedraw = false;
		}
	}

}

class GameGrid {
	constructor(size_x, size_y) {
		this.sx = size_x
		this.sy = size_y
		this.cellSize = 32
		this.cells = []
	}

	init(scene) {
			for (let i = 0; i < this.sx; i++) {
				for (let j = 0; j < this.sy; j++) {
					let gridCell = new GameGridCell(j, i, scene);

					gridCell.draw();
					this.cells[i * this.sx + j] = gridCell;
				}
			}
	}

	getCellWorldPoint(cell) {
		return {
			x: cell.px * this.cellSize,
			y: cell.py * this.cellSize
		}
	}

	getCellAt(x, y) {
		let xCell = Math.floor(x / this.cellSize)
		let yCell = Math.floor(y / this.cellSize)
		//console.log(xCell + " " + yCell);
		return this.cells[yCell * this.sx + xCell];
	}

	getCellArrayIdx(idx_x, idx_y) {
		return idx_y * this.sx + idx_x;
	}

	getCellAtIdx(idx_x, idx_y) {
		if ( idx_x < 0 || idx_y < 0) {
			return undefined;
		}
		return this.cells[idx_y * this.sx + idx_x];
	}

	resetCells() {
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i].highlight == true) {
				//console.log("Resetting")
			}
			this.cells[i].setHighlight(false);
			this.cells[i].process();
		}
	}

	getNeighbourCells(cell) {
		// Return array of array[2] ([[cell, distance]])
		let result = []

		if (cell.px != 0) {
			// Edge cell cell check
			if (cell.py != this.sy) {
				result.push([this.getCellAtIdx(cell.px - 1, cell.py + 1), sqrtTwo]);
			}
			result.push([this.getCellAtIdx(cell.px - 1, cell.py), 1]);
		}

		if (cell.py != 0) {
			// Edge cell cell check
			if (cell.px != this.sx) {
				result.push([this.getCellAtIdx(cell.px + 1, cell.py - 1), sqrtTwo]);
			}
			result.push([this.getCellAtIdx(cell.px, cell.py - 1), 1]);
		}

		// Corner cell check
		if (cell.px != 0 && cell.py != 0) {
			result.push([this.getCellAtIdx(cell.px - 1, cell.py - 1), sqrtTwo]);
		}
		if (cell.px != this.sx && cell.py != this.sy) {
			result.push([this.getCellAtIdx(cell.px + 1, cell.py + 1), sqrtTwo]);
		}

		if (cell.py != this.sy) {
			result.push([this.getCellAtIdx(cell.px, cell.py + 1), 1]);
		}
		if (cell.px != this.sx) {
			result.push([this.getCellAtIdx(cell.px + 1, cell.py), 1]);
		}

		return result;
	}

	process() {
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].process()
		}
	}
}

exports.GameGrid =  GameGrid
exports.GameGridCell = GameGridCell
