import * as PIXI from "pixi.js";
import { Enemy } from "./enemy"
import { Player } from "./player";

import backgroundImage from "./images/background_nl.png";
import enemyImage from "./images/spacepirate.png"
import deadImage from "./images/spacepirate_destroyed.png"
import playerImage from "./images/spacecraft.png";

export class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    background: PIXI.Sprite;
    enemies: Enemy[] = [];
    player: Player;

    constructor() {
        this.pixi = new PIXI.Application({
            width: screen.width,
            height: screen.height
        });
        document.body.appendChild(this.pixi.view);
        
        this.loader = new PIXI.Loader();
        this.loader
            .add("playerTexture", playerImage)
            .add("enemytexture", enemyImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", backgroundImage);
        document.body.appendChild(this.pixi.view)

        this.loader.load(() => this.doneLoading())
    }


    doneLoading() {
        //Background
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        this.pixi.stage.addChild(this.background)

        //enemy
        for (let i = 0; i < 10; i++) {
            let enemy = new Enemy(this, this.loader.resources["enemytexture"].texture!, this.loader.resources["deadTexture"].texture!);
            this.pixi.stage.addChild(enemy);
            this.enemies.push(enemy);
        }

        //Player
        this.player = new Player(this, this.loader.resources["playerTexture"].texture!);
        this.pixi.stage.addChild(this.player)

        this.pixi.stage.x = this.pixi.screen.width / 2
        this.pixi.stage.y = this.pixi.screen.height / 2

        this.pixi.ticker.add((delta) => this.update(delta))


    }

    update(delta: number) {
        this.player.update(delta);
        for (let enemy of this.enemies) {
            if (this.collision(enemy, this.player)) {
                enemy.texture = this.loader.resources["deadTexture"].texture!;
                const color_none = new PIXI.filters.ColorMatrixFilter()
                enemy.filters = [color_none]
                color_none.hue(0, false)
              }
            enemy.update(delta);
        }
    }
    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds();
        const bounds2 = sprite2.getBounds();
    
        return (
          bounds1.x < bounds2.x + bounds2.width &&
          bounds1.x + bounds1.width > bounds2.x &&
          bounds1.y < bounds2.y + bounds2.height &&
          bounds1.y + bounds1.height > bounds2.y
          );
      }


    }
  