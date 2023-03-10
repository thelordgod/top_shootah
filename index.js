import {GameRunner} from './game'
import {PathFinder} from './game_modules/path_finder';
import { MoveToTarget, MoveAlongPath, WanderAround, MoveToUnit } from './game_modules/behaviour';
import {Editor} from './editor/editor'

class MainScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'grid_scene', active: true });
    }

    preload ()
    {
		this.load.image('unit', 'assets/unit.png');
    }

    create ()
    {
		this.game = new GameRunner(this);
		this.editor = new Editor(this.game);
		this.editor.addButton();
		this.game.addPlayer();
		this.game.addUnit({x : 100, y : 100}, 0.5, new WanderAround(this.game.grid));
		this.wanderer = this.game.addUnit({x : 120, y : 200}, 1.8, new WanderAround(this.game.grid));
		this.follower = this.game.addUnit({x : 300, y : 500}, 0.6, new MoveToUnit(this.wanderer));
    }

    update ()
    {
		this.game.update(0.1);
		this.game.setCamera(this.game.player.pos);
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
