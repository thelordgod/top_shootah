import {GameRunner} from './game'
import {PathFinder} from './game_modules/path_finder';
import { MoveToTarget, MoveAlongPath, WanderAround, MoveToUnit } from './game_modules/behaviour';

class MainScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'grid_scene', active: true });
    }

    preload ()
    {
		this.load.image('unit', 'assets/unit.png');
		this.game = new GameRunner(this)
    }

    create ()
    {
		this.game.addUnit({x : 100, y : 100}, 0.5, new WanderAround(this.game.grid));
		let wanderer = this.game.addUnit({x : 120, y : 200}, 1.8, new WanderAround(this.game.grid));
		this.game.addUnit({x : 300, y : 500}, 0.6, new MoveToUnit(wanderer));
    }

    update ()
    {
		this.game.update(0.1);
    }
}

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: MainScene
};

var game = new Phaser.Game(config);
document.body.appendChild(document.createElement("div"))
