import * as PIXI from "pixi.js"
import { Game } from "./game"


export class Powerup extends PIXI.Sprite {

    game: Game
    
    constructor(game: Game, texture: PIXI.Texture) {
        super(texture)
        this.game = game
        this.x = Math.random() * 2000
        this.y = Math.random() * 2000
        this.scale.set(0.05)
    }

    update(delta:number) {
    
    }
    
}
