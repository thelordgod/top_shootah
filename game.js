import { GameUnit } from "./game_modules/game_unit"
import {GameGrid} from './game_modules/grid';
import {Player} from './game_modules/player';

class GameRunner {

	constructor(scene) {
		this.units = []
		this.scene = scene
		this.grid = new GameGrid(100, 100);
		this.grid.init(this.scene);
		this.cam = scene.cameras.main
		this.cam.setZoom(1);
		this.moveKeys = this.scene.input.keyboard.addKeys({
				up: Phaser.Input.Keyboard.KeyCodes.W,
				down: Phaser.Input.Keyboard.KeyCodes.S,
				left: Phaser.Input.Keyboard.KeyCodes.A,
				right: Phaser.Input.Keyboard.KeyCodes.D
			});
	}

	addPlayer() {
		this.player = new Player(this, {x: 20, y: 20})
		this.units.push(this.player);
	}

	addUnit(pos, speed, initial_behaviour) {
		let newUnit = new GameUnit(this.scene, pos, speed)
		if (initial_behaviour != undefined) {
			newUnit.setBehaviour(initial_behaviour);
		}
		this.units.push(newUnit);
		return newUnit
	}

	processInput() {
		let speed = 10.0;
		let moveDir = {x: 0.0, y: 0.0};
		let revSqrt2 = 0.7071;

		if (this.moveKeys.up.isDown) {
			console.log("Up pressed")
			moveDir.y -= 1.0;
		}
		if (this.moveKeys.down.isDown) {
			console.log("Down pressed")
			moveDir.y += 1.0;
		}
		if (this.moveKeys.left.isDown) {
			console.log("Left pressed")
			moveDir.x -= 1.0;
		}
		if (this.moveKeys.right.isDown) {
			console.log("Right pressed")
			moveDir.x += 1.0;
		}

		if (moveDir.x != 0.0 && moveDir.y != 0.0) {
			// Going diagonally
			moveDir.x *= revSqrt2;
			moveDir.y *= revSqrt2;
		}

		moveDir.x *= speed;
		moveDir.y *= speed;

		this.player.move(moveDir);
	}

	setCamera(pos) {
        this.cam.centerOn(pos.x, pos.y);
	}

	update(dt) {
		this.grid.resetCells();
		this.processInput();
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].update(dt);
			let cell = this.grid.getCellAt(this.units[i].pos.x, this.units[i].pos.y)
			cell.setHighlight(true)
			cell.process()
		}
	}
}

exports.GameRunner = GameRunner
