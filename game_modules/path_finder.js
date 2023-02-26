import { GameGrid } from "./grid";


class PathFinder {
	static getPath(grid, from, to) {
		let result = []
		let cellDinstances = []
		let cellQ = []
		let fromCell = grid.getCellAt(from.x, from.y)
		let toCell = grid.getCellAt(to.x, to.y)

		// Init distance array
		for (let i = 0; i < grid.cells.length; i++) {
			cellDinstances.push(-1);
		}

		console.log("Getting path from cell(" + fromCell.px + ", " + fromCell.py + ") to cell(" + toCell.px + ", " + toCell.py + ")");

		let targetFound = false;
		cellDinstances[grid.getCellArrayIdx(fromCell.px, fromCell.py)] = 0;
		cellQ.push(fromCell)

		while (cellQ.length > 0 && targetFound != true) {
			let cell = cellQ.shift()

			if (grid.getCellArrayIdx(cell.px, cell.py) == grid.getCellArrayIdx(toCell.px, toCell.py)) {
				targetFound = true;
				break;
			}

			let cellDist = cellDinstances[grid.getCellArrayIdx(cell.px, cell.py)]
			console.log("Processing cell at x: " + cell.px + "y: " + cell.py + " dist:" + cellDist)

			let nextCells = grid.getNeighbourCells(cell)

			for (let i = 0; i < nextCells.length; i++) {
				let idx = grid.getCellArrayIdx(nextCells[i][0].px, nextCells[i][0].py)
				if (cellDinstances[idx] == -1) {
					cellDinstances[idx] = cellDist + nextCells[i][1];
					cellQ.push(nextCells[i][0]);
				}
			}
		}

		if (!targetFound) {
			return [];
		}

		let backtrackDone = false;
		let absMinDist = cellDinstances[grid.getCellArrayIdx(toCell.px, toCell.py)]

		cellQ = [];

		cellQ.push(toCell);
		while (cellQ.length > 0 && backtrackDone != true) {
			let cell = cellQ.shift()

			if (grid.getCellArrayIdx(cell.px, cell.py) == grid.getCellArrayIdx(fromCell.px, fromCell.py)) {
				backtrackDone = true;
				break;
			}

			let cellDist = cellDinstances[grid.getCellArrayIdx(cell.px, cell.py)]
			console.log("Backtracking at x: " + cell.px + "y: " + cell.py + " dist:" + cellDist)

			let nextCells = grid.getNeighbourCells(cell)

			if (cellDist == -1) {
				console.log("Skipping")
				continue;
			}

			let minDistance = cellDist;
			let minDistIdx = -1;
			for (let i = 0; i < nextCells.length; i++) {
				let idx = grid.getCellArrayIdx(nextCells[i][0].px, nextCells[i][0].py)
				if (minDistance > cellDinstances[idx] && cellDinstances[idx] != -1) {
					minDistance = cellDinstances[idx];
					minDistIdx = idx;
				}
			}

			if (minDistance == -1) {
				console.log("Skipping2")
				continue;
			}

			if (minDistance > absMinDist) {
				continue;
			} else {
				absMinDist = minDistance;
			}

			cellQ.push(grid.cells[minDistIdx]);
			result.push(grid.cells[minDistIdx]);

			//for (let i = 0; i < nextCells.length; i++) {
			//	let idx = grid.getCellArrayIdx(nextCells[i][0].px, nextCells[i][0].py)
			//	if (cellDinstances[idx] == minDistance) {
			//		cellQ.push(nextCells[i][0]);
			//		result.push(nextCells[i][0]);
			//	}
			//}
		}
		return result;
	}
}

exports.PathFinder = PathFinder
