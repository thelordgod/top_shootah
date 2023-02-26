import {GameRunner} from './game'

import { MoveToTarget } from './game_modules/behaviour';

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
		this.game.addUnit({x : 100, y : 100});
		this.game.addUnit({x : 120, y : 200}, new MoveToTarget({x: 700, y: 500}));
		this.game.addUnit({x : 300, y : 500});
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
