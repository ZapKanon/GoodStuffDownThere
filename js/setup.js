//Create the app
const app = new PIXI.Application(400, 640);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	

document.querySelector("#game").appendChild(app.view); 

//Initialize many things
let startLabel1;
let startLabel2;
let startButton;

let gameScene;
let menuScene;

let knight;
let player;

let infoMove;
let infoEnemy;

let tiles;
let healthTiles;
let moveTiles;
let equipTiles;

let tile11;
let tile12;
let tile13;
let tile14;
let tile15;
let tile21;
let tile22;
let tile23;
let tile24;
let tile25;
let tile31;
let tile32;
let tile33;
let tile34;
let tile35;
let tile41;
let tile42;
let tile43;
let tile44;
let tile45;
let tile51;
let tile52;
let tile53;
let tile54;
let tile55;

let tileIceStaff;
let tileEarthHammer;
let tileFireSword;
let tileAirAxe;

let tileLeft;
let tileUp;
let tileRight;
let tileDown;
let tileMap;

let tileHP1;
let tileHP2;
let tileHP3;

let equipOverlay;
let weaponOverlay;

let movementAmount = 98;
let bestTime = 9999;
let time;
let startTime;

let walkSound;
let combatSound;
let itemSound;
let loseSound;
let winSound;

//Load Images
PIXI.loader.add(["media/EnemyKnightIce.png", "media/EnemyKnightEarth.png", "media/EnemyKnightFire.png", "media/EnemyKnightAir.png", "media/Empty.png", "media/Full.png", "media/PlayerCobalt.png", "media/ItemSword.png", "media/ItemFireSword.png", "media/ItemAirAxe.png", "media/ItemEarthHammer.png", "media/ItemIceStaff.png", "media/Stairs.png", "media/Left.png", "media/Right.png", "media/Up.png", "media/Down.png", "media/EquipOverlay.png", "media/EquipIceStaff.png", "media/EquipEarthHammer.png", "media/EquipFireSword.png", "media/EquipAirAxe.png", "media/EquipSword.png", "media/Heart.png", "media/Instructions.png", "media/EnemyTypes.png"]).
on("progress",e=>{}).
load(setup);

//Place all components of the two scenes (menuScene and gameScene)
function setup(){

    //Menu Scene Contents
    menuScene = new PIXI.Container();
    app.stage.addChild(menuScene);
    
    gameScene = new PIXI.Container();
    app.stage.addChild(gameScene);
    gameScene.visible = false;
    
    menuScene.scale.set(0.8);
    gameScene.scale.set(0.8);
    
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFFFF00,
        fontSize: 48,
        fontFamily: "arial"
    });
    
    startLabel1 = new PIXI.Text("There Has to Be Some \nGood Stuff Down There");
    startLabel1.style = new PIXI.TextStyle({
        fill: 0xFFFF00,
        fontSize: 40,
        fontFamily: "arial"
    });
    startLabel1.x = 50;
    startLabel1.y = 70;
    menuScene.addChild(startLabel1);
    
    if (localStorage.getItem("krw1619DungeonTimeOld") == 0) {
        localStorage.setItem("krw1619DungeonTimeOld", 500000000);
    }
    bestTime = localStorage.getItem("krw1619DungeonTimeOld");
    
    //Don't show a best time if the player hasn't beaten the game before
    if (bestTime < 5000000) {
        startLabel2 = new PIXI.Text("Your Best Time: " + bestTime / 1000 + " seconds.");
    }
    else {
        startLabel2 = new PIXI.Text("");
    }
    
    startLabel2.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 32,
        fontFamily: "arial",
    });
    startLabel2.x = 10;
    startLabel2.y = 200;
    menuScene.addChild(startLabel2);
    
    startButton = new PIXI.Text("Click to Play");
    startButton.style = buttonStyle;
    startButton.x = 120;
    startButton.y = 680;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", levelOne);
    startButton.on("pointerover", e=>e.target.alpha = 0.7); 
    startButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    menuScene.addChild(startButton);

    knight = PIXI.Sprite.fromImage("media/PlayerCobalt.png");
    gameScene.addChild(knight);
    knight.alpha = 0;
    
    //Sounds
    walkSound = new Howl({
        src: ['sounds/walk.wav'],
        volume: 0.1
    });

    combatSound = new Howl({
        src: ['sounds/combat.wav']
    });
    
    itemSound = new Howl({
        src: ['sounds/item.wav']
    });

    winSound = new Howl({
        src: ['sounds/win.wav']
    });
    
    loseSound = new Howl({
        src: ['sounds/lose.wav']
    });
    
    //Player
    player = new Player();
    
    infoMove = PIXI.Sprite.fromImage("media/Instructions.png");
    infoEnemy = PIXI.Sprite.fromImage("media/EnemyTypes.png");
    
    menuScene.addChild(infoMove);
    menuScene.addChild(infoEnemy);
    
    infoMove.x = 7;
    infoEnemy.x = 252;
    infoMove.y = 300;
    infoEnemy.y = 300;
    
    //Menu Tiles
    tileIceStaff = new Tile(150, 550, 0, 0);
    tileEarthHammer = new Tile(350, 550, 0, 0);
    tileFireSword = new Tile(150, 750, 0, 0);
    tileAirAxe = new Tile(350, 750, 0, 0);
    
    tileLeft = new Tile(150, 650, 0, 0);
    tileUp = new Tile(250, 550, 0, 0);
    tileRight = new Tile(350, 650, 0, 0);
    tileDown = new Tile(250, 750, 0, 0);
    tileMap = new Tile(250, 650, 0, 0);
    
    tileHP1 = new Tile(50, 550, 0, 0);
    tileHP2 = new Tile(50, 650, 0, 0);
    tileHP3 = new Tile(50, 750, 0, 0);
    
    equipOverlay = new Tile(-100, -100, 0, 0);
    weaponOverlay = new Tile(250, 250, 0, 0);
    
    moveTiles = [tileLeft, tileUp, tileRight, tileDown];
    
    equipTiles = [tileFireSword, tileEarthHammer, tileAirAxe, tileIceStaff];
    
    healthTiles = [tileHP1, tileHP2, tileHP3];
    
    gameScene.addChild(tileFireSword);
    gameScene.addChild(tileEarthHammer);
    gameScene.addChild(tileAirAxe);
    gameScene.addChild(tileIceStaff);
    gameScene.addChild(tileMap);
    
    gameScene.addChild(tileLeft);
    gameScene.addChild(tileRight);
    gameScene.addChild(tileUp);
    gameScene.addChild(tileDown);
    
    gameScene.addChild(tileHP1);
    gameScene.addChild(tileHP2);
    gameScene.addChild(tileHP3);
    
    gameScene.addChild(equipOverlay);
    gameScene.addChild(weaponOverlay);

    //Set click and tap functions for interactable buttons
    for (let button of equipTiles) {
        button.interactive = true;
	    button.tap = clickedEquip;
        button.click = clickedEquip;
    }
    
    for (let button of moveTiles) {
        button.interactive = true;
	    button.tap = clickedMove;
        button.click = clickedMove;
    }
    
    app.renderer.backgroundColor = 0x555555;
    
    app.ticker.add(gameLoop);
};

//Setup for Floor 1 and additional initial setup for gameScene
function levelOne() {

    loadLevelMap(dungeonFloor0);
    player.health = 3;
    player.floorNumber = 1;
    menuScene.visible = false;
    gameScene.visible = true;
    knight.row = 6;
    knight.column = 3;
    
    //Tiles showing parts of the floor
    tile11 = new Tile(50, 50, 1, 1);
    tile12 = new Tile(150, 50, 1, 2);
    tile13 = new Tile(250, 50, 1, 3);
    tile14 = new Tile(350, 50, 1, 4);
    tile15 = new Tile(450, 50, 1, 5);

    tile21 = new Tile(50, 150, 2, 1);
    tile22 = new Tile(150, 150, 2, 2);
    tile23 = new Tile(250, 150, 2, 3);
    tile24 = new Tile(350, 150, 2, 4);
    tile25 = new Tile(450, 150, 2, 5);

    tile31 = new Tile(50, 250, 3, 1);
    tile32 = new Tile(150, 250, 3, 2);
    tile33 = new Tile(250, 250, 3, 3);
    tile34 = new Tile(350, 250, 3, 4);
    tile35 = new Tile(450, 250, 3, 5);

    tile41 = new Tile(50, 350, 4, 1);
    tile42 = new Tile(150, 350, 4, 2);
    tile43 = new Tile(250, 350, 4, 3);
    tile44 = new Tile(350, 350, 4, 4);
    tile45 = new Tile(450, 350, 4, 5);

    tile51 = new Tile(50, 450, 5, 1);
    tile52 = new Tile(150, 450, 5, 2);
    tile53 = new Tile(250, 450, 5, 3);
    tile54 = new Tile(350, 450, 5, 4);
    tile55 = new Tile(450, 450, 5, 5);
    
    gameScene.addChild(tile11);
    gameScene.addChild(tile12);
    gameScene.addChild(tile13);
    gameScene.addChild(tile14);
    gameScene.addChild(tile15);
    
    gameScene.addChild(tile21);
    gameScene.addChild(tile22);
    gameScene.addChild(tile23);
    gameScene.addChild(tile24);
    gameScene.addChild(tile25);
    
    gameScene.addChild(tile31);
    gameScene.addChild(tile32);
    gameScene.addChild(tile33);
    gameScene.addChild(tile34);
    gameScene.addChild(tile35);
    
    gameScene.addChild(tile41);
    gameScene.addChild(tile42);
    gameScene.addChild(tile43);
    gameScene.addChild(tile44);
    gameScene.addChild(tile45);
    
    gameScene.addChild(tile51);
    gameScene.addChild(tile52);
    gameScene.addChild(tile53);
    gameScene.addChild(tile54);
    gameScene.addChild(tile55);
    
    tiles = [tile11, tile12, tile13, tile14, tile15, tile21, tile22, tile23, tile24, tile25, tile31, tile32, tile33, tile34, tile35, tile41, tile42, tile43, tile44, tile45, tile51, tile52, tile53, tile54, tile55];
    
    //Move tiles into correct location for first floor
    for (let tile of tiles)
    {
        tile.row += 3;
    }
    
    menu();
    gameScene.addChild(weaponOverlay);
    
    updateScreen(0, 0);
    startTime = Date.now();
}

//Setup for Floor 2
function levelTwo() {
    loadLevelMap(dungeonFloor1);
    knight.row = 5;
    knight.column = 3;
    for (let tile of tiles)
    {
        tile.column -= 3;
    }
}

//Setup for Floor 3
function levelThree() {
    loadLevelMap(dungeonFloor2);
    knight.row = 6;
    knight.column = 4;
    for (let tile of tiles)
    {
        tile.column += 3;
    }
}

//Setup for floor 4
function levelFour() {
    loadLevelMap(dungeonFloor3);
    knight.row = 7;
    knight.column = 7;
    for (let tile of tiles)
    {
        tile.row += 6;
        tile.column += 1;
    }
}

//Clone the array used for this dungeon floor
//By making a copy of the array, the original will remain untouched when enemies are defated, items are colleced, etc.
//The game can then be  replayed easily.
function loadLevelMap(levelMap) {
    dungeonFloor = [];
    for (var i = 0; i < levelMap.length; i++) {
        dungeonFloor[i] = levelMap[i].slice();
    }      
}
