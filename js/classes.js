//Holds information on player status
class Player {
    constructor(){

        this.health = 3;       
        this.hasSword = false;
        this.hasFireSword = false;
        this.hasAirAxe = false;
        this.hasIceStaff = false;
        this.hasEarthHammer = false;
        this.equippedWeapon = "None";
        this.floorNumber = 1;
    }
}

//Used by all dungeon and inventory tiles
class Tile extends PIXI.Sprite{
        constructor(x=0, y=0, row=0, column=0){
            super(PIXI.loader.resources["media/Full.png"].texture);
            this.anchor.set(.5,.5); // position, scaling, rotating etc are now from center of sprite
            this.scale.set(1.0);
            this.x = x;
            this.y = y;
            this.row = row;
            this.column = column;
        }
    }