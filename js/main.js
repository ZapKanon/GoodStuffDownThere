"use strict";

//Moves character using onscreen buttons
function clickedMove() {
    //Left
    if (this.x == 150 && this.y == 650) {
        if (checkMovement(knight.column - 1, knight.row))
        {
            knight.column -= 1;
            updateScreen(-1, 0);
        }
    }
    //Up
    if (this.x == 250 && this.y == 550) {
        if (checkMovement(knight.column, knight.row - 1))
        {
            knight.row -= 1;
            updateScreen(0, -1);
        }  
    }
   
    //Down
    if (this.x == 250 && this.y == 750) {
        if (checkMovement(knight.column, knight.row + 1))
        {
            knight.row += 1;
            updateScreen(0, 1);
        }
    }
    //Right
    if (this.x == 350 && this.y == 650) {
        if (checkMovement(knight.column + 1, knight.row))
        {
            knight.column += 1;
            updateScreen(1, 0);
        }
    }
    walkSound.play();
}

//Changes equipped weapon using onscreen buttons
function clickedEquip() {
    if (this.x == 150 && this.y == 750) {
        if (player.hasFireSword) {
            player.equippedWeapon = "FireSword";
            equipOverlay.x = this.x;
            equipOverlay.y = this.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipFireSword.png");
        }
        else if (player.hasSword) {
            player.equippedWeapon = "sword";
            equipOverlay.x = this.x;
            equipOverlay.y = this.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipSword.png");
        }
    }
    if (this.x == 350 && this.y == 550) {
        if (player.hasEarthHammer) {
            player.equippedWeapon = "EarthHammer";
            equipOverlay.x = this.x;
            equipOverlay.y = this.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipEarthHammer.png");
        }
    }
    if (this.x == 350 && this.y == 750) {
        if (player.hasAirAxe) {
            player.equippedWeapon = "AirAxe";
            equipOverlay.x = this.x;
            equipOverlay.y = this.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipAirAxe.png");
        }
    }
    if (this.x == 150 && this.y == 550) {
        if (player.hasIceStaff) {
            player.equippedWeapon = "IceStaff";
            equipOverlay.x = this.x;
            equipOverlay.y = this.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipIceStaff.png");
        }
    }
    itemSound.play();
}


//Determines if movement onto a tile is valid
//Calls other methods based on contents of the tile
function checkMovement(column, row) {

    let moveRow = dungeonFloor[row];

    if (moveRow != null && moveRow[column] != null)
    {
        switch (moveRow[column]) {
            //Empty Tile
            case "O":
                return true;
            //Wall
            case "X":
                return false;
            //Enemies
            case "I":
            case "E":
            case "A":
            case "F":
            case "G":
            case "W":
                if (combat(column, row)) {
                    return true;
                }
                return false;
            //Items
            case "s":
            case "i":
            case "e":
            case "f":
            case "a":
            case "h":
                if (getItem(column, row)) {
                    return true;
                }
                return false;
            //Stairs
            case "S":
                moveToNextFloor();
                return true;
        }
    }
}

//Updates visible tiles when player moves
function updateScreen(columnChange, rowChange) {
    for (let tile of tiles) {        
        tile.row += rowChange;
        tile.column += columnChange;
        updateTile(tile);
    }
}

//Changes a tile's image when player moves
function updateTile(tile) {
    let currentRow = dungeonFloor[tile.row];
    if (currentRow != null && currentRow[tile.column] != null) {
        switch (currentRow[tile.column]) {
            case "X":
                tile.texture = PIXI.Texture.fromImage("media/Full.png");
                break;
            case "O":
                tile.texture = PIXI.Texture.fromImage("media/Empty.png");
                break;
            case "S":
                tile.texture = PIXI.Texture.fromImage("media/Stairs.png");
                break;
            case "s":
                tile.texture = PIXI.Texture.fromImage("media/ItemSword.png");
                break;
            case "i":
                tile.texture = PIXI.Texture.fromImage("media/ItemIceStaff.png");
                break;
            case "e":
                tile.texture = PIXI.Texture.fromImage("media/ItemEarthHammer.png");
                break;
            case "f":
                tile.texture = PIXI.Texture.fromImage("media/ItemFireSword.png");
                break;
            case "a":
                tile.texture = PIXI.Texture.fromImage("media/ItemAirAxe.png");
                break;
            case "I":
                tile.texture = PIXI.Texture.fromImage("media/EnemyKnightIce.png");
                break;
            case "E":
                tile.texture = PIXI.Texture.fromImage("media/EnemyKnightEarth.png");
                break;
            case "F":
                tile.texture = PIXI.Texture.fromImage("media/EnemyKnightFire.png");
                break;
            case "A":
                tile.texture = PIXI.Texture.fromImage("media/EnemyKnightAir.png");
                break;
            case "G":
                tile.texture = PIXI.Texture.fromImage("media/EnemyKnightGold.png");
                break;
            case "W":
                tile.texture = PIXI.Texture.fromImage("media/EnemyGhost.png");
                break;
            case "h":
                tile.texture = PIXI.Texture.fromImage("media/Heart.png");
                break;
            default:
                tile.texture = PIXI.Texture.fromImage("media/Full.png");
                break;
        }
    }
    else {
        tile.texture = PIXI.Texture.fromImage("media/Full.png");
    }
    tile33.texture = PIXI.Texture.fromImage("media/PlayerCobalt.png");
}

//Sets menu tile images for the start of the game
function menu() {
    tileFireSword.texture = PIXI.Texture.fromImage("media/Empty.png");
    tileEarthHammer.texture = PIXI.Texture.fromImage("media/Empty.png");
    tileAirAxe.texture = PIXI.Texture.fromImage("media/Empty.png");
    tileIceStaff.texture = PIXI.Texture.fromImage("media/Empty.png");
    
    tileMap.texture = PIXI.Texture.fromImage("media/Empty.png");
    
    tileLeft.texture = PIXI.Texture.fromImage("media/Left.png");
    tileRight.texture = PIXI.Texture.fromImage("media/Right.png");
    tileUp.texture = PIXI.Texture.fromImage("media/Up.png");
    tileDown.texture = PIXI.Texture.fromImage("media/Down.png");
    
    tileHP1.texture = PIXI.Texture.fromImage("media/Heart.png");
    tileHP2.texture = PIXI.Texture.fromImage("media/Heart.png");
    tileHP3.texture = PIXI.Texture.fromImage("media/Heart.png");
    
    equipOverlay.texture = PIXI.Texture.fromImage("media/EquipOverlay.png");
    weaponOverlay.alpha = 0;
}

//Updates health icons to match player's current health
function updateHealth() {
    
    for(let i = 1; i <= 3; i++) {
        if (i <= player.health) {
            healthTiles[i - 1].texture = PIXI.Texture.fromImage("media/Heart.png");
        }
        else {
            healthTiles[i - 1].texture = PIXI.Texture.fromImage("media/Empty.png");
        }
        
        //End the game in defeat if player reaches zero health
        if (player.health <= 0) {
            gameOver(false);
        }
    }
}

//Determines result of combat based on equipped weapon and enemy type
function combat(column, row) {
    let combatResult = "NoEffect";
    let currentRow = dungeonFloor[row]
    switch (currentRow[column]) {
        case "I":
            if (player.equippedWeapon == "IceStaff") {
                combatResult = "NoEffect";
            }
            else if (player.equippedWeapon == "FireSword") {
                combatResult ="SuperEffect";
            }
            else {
              combatResult = "Effect";  
            }
            break;
        case "E":
            if (player.equippedWeapon == "EarthHammer") {
                combatResult = "NoEffect";
            }
            else if (player.equippedWeapon == "AirAxe") {
                combatResult = "SuperEffect";
            }
            else {
                combatResult = "Effect";
            }     
            break;
        case "F":
            if (player.equippedWeapon == "FireSword") {
                combatResult = "NoEffect";
            }
            else if (player.equippedWeapon == "EarthHammer") {
                combatResult = "SuperEffect";
            }
            else {
                combatResult = "Effect";
            }
            break;
        case "A":
            if (player.equippedWeapon == "AirAxe") {
                combatResult = "NoEffect";
            }
            else if (player.equippedWeapon == "IceStaff") {
                combatResult = "SuperEffect";
            }
            else {
                combatResult = "Effect";
            }
            break;
        case "G":           
            combatResult = "SuperEffect";
            gameOver(true);
            break;
        case "W":
            if (player.equippedWeapon == "Sword") {
                combatResult = "NoEffect";
            }
            else {
                combatResult = "SuperEffect";
            }
            break;
    }
    
    combatSound.play();
    if (combatResult == "NoEffect") {
        player.health -= 1;
        updateHealth();
        return false;
    }
    else if (combatResult == "Effect") {
        player.health -= 1;
        currentRow[column] = "O";
        updateHealth();
        return true;
    }
    else if (combatResult == "SuperEffect") {
        currentRow[column] = "O";
        return true;
    }
    return false;
}
    
//Add an item to the player's inventory and remove it from the map
function getItem(column, row) {
    let currentRow = dungeonFloor[row];
    switch (currentRow[column]) {
        case "i":
            player.hasIceStaff = true;
            tileIceStaff.texture = PIXI.Texture.fromImage("media/ItemIceStaff.png");
            break;
        case "e":
            player.hasEarthHammer = true;
            tileEarthHammer.texture = PIXI.Texture.fromImage("media/ItemEarthHammer.png");
            break;
        case "f":
            player.hasFireSword = true;
            tileFireSword.texture = PIXI.Texture.fromImage("media/ItemFireSword.png");
            break;
        case "a":
            player.hasAirAxe = true;
            tileAirAxe.texture = PIXI.Texture.fromImage("media/ItemAirAxe.png");
            break;
        case "s":           
            player.hasSword = true;
            tileFireSword.texture = PIXI.Texture.fromImage("media/ItemSword.png");
            player.equippedWeapon = "Sword";
            equipOverlay.x = tileFireSword.x;
            equipOverlay.y = tileFireSword.y;
            weaponOverlay.texture = PIXI.Texture.fromImage("media/EquipSword.png");
            weaponOverlay.alpha = 1;
            break;
        case "h":
            //Cap player health at 3
            player.health += 1;
            if (player.health > 3) {
                player.health = 3;
            }
            updateHealth();
            break;
    }
    currentRow[column] = "O";
    itemSound.play();
    return true;
}

//Update the map, place the player on the new floor
function moveToNextFloor() {
    player.floorNumber++;
    switch (player.floorNumber) {
        case 2: 
            levelTwo();
            break;
        case 3:
            levelThree();
            break;
        case 4:
            levelFour();
            break;
    }
}

//End the game in victory or defet
function gameOver(victory) {
    if (victory == true) {
        time = Date.now() - startTime;
        startLabel1.x = 175;
        startLabel1.text = "You win!";
        startLabel2.x = 20;
        startLabel2.text = "Your time was: " + (time / 1000) + " seconds.";
        winSound.play();
        
    if (time < bestTime) {
        localStorage.setItem("krw1619DungeonTimeOld", time);
        startLabel2.text += " \n             New Best Time!";
        bestTime = localStorage.getItem("krw1619DungeonTimeOld");
    }     
              
    }
    else {
        startLabel1.x = 115;
        startLabel1.text = "You have fallen \nin the dungeon...";
        startLabel2.text = "";
        loseSound.play();
    }
    
    infoMove.alpha = 0;
    infoEnemy.alpha = 0;
    startButton.text = "Play again?";
    
    gameScene.visible = false;
    menuScene.visible = true;
    
}

//Check for keyboard input
function gameLoop() {
    window.onkeydown = (e)=>{
            
    //W / Up
    if(e.keyCode == 87){
        if (checkMovement(knight.column, knight.row - 1))
        {
            knight.row -= 1;
            updateScreen(0, -1);
            walkSound.play();
        }          
    }
    //A / Left
    else if(e.keyCode == 65)
    {
        if (checkMovement(knight.column - 1, knight.row))
        {
            knight.column -= 1;
            updateScreen(-1, 0);
            walkSound.play();
        }
    }
    //S / Down
    else if(e.keyCode == 83)
    {
        if (checkMovement(knight.column, knight.row + 1))
        {
            knight.row += 1;
            updateScreen(0, 1);
            walkSound.play();
        }
    }
    //D / Right
    else if(e.keyCode == 68)
    {
        if (checkMovement(knight.column + 1, knight.row))
        {
            knight.column += 1;
            updateScreen(1, 0);
            walkSound.play();

        }
    }
}
}