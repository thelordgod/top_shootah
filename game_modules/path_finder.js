import { GameGrid } from "./grid";

class PathFinder {
	static getPath(grid, from, to) {
		let cellDinstances = []
		let cellQ = []
		let fromCell = grid.getCellAt(from.x, from.y)
		let toCell = grid.getCellAt(to.x, to.y)

		cellQ.push(fromCell)

		// Init distance array
		for (let i = 0; i < grid.cells.length; i++) {
			cellDinstances.push(-1);
		}

		let targetFound = false;
		cellDinstances[grid.getCellArrayIdx(fromCell.px, fromCell.py)] = 0;

		while (cellQ.length < 1 || targetFound == true) {
			let cell = cellQ.pop()
			if (cell == toCell) {
				targetFound = true;
			}

			// Add neighbours to processing list
			cellQ.push(grid.getCellAtIdx(cell.px - 1, cell.py - 1));
			cellDinstances[grid.getCellArrayIdx(cell.px - 1, cell.py - 1)] = cellmo;
			cellQ.push(grid.getCellAtIdx(cell.px - 1, cell.py));
			cellQ.push(grid.getCellAtIdx(cell.px - 1, cell.py + 1));
			cellQ.push(grid.getCellAtIdx(cell.px, cell.py - 1));
			cellQ.push(grid.getCellAtIdx(cell.px + 1, cell.py - 1));
			cellQ.push(grid.getCellAtIdx(cell.px, cell.py + 1));
			cellQ.push(grid.getCellAtIdx(cell.px + 1, cell.py + 1));
			cellQ.push(grid.getCellAtIdx(cell.px + 1, cell.py));
		}
	}
}
