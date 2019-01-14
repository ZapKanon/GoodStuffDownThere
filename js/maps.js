//Legend:

// X = Wall
// O = Empty Tile
// S = Stairs

//ITEMS
// s = Sword
// i = Ice Staff
// e = Earth Hammer
// f = Fire Sword
// a = Air Axe
// h = Extra Heart

//ENEMIES
// I = Ice Knight
// E = Earth Knight
// F = Fire Knight
// A = Air Knight
// G = Gold Knight
// W = Ghost/Wraith

let dungeonFloor = [];

//Floor 1 Map
let dungeonFloor0 = [["O", "O", "O", "O", "I", "O", "O"], 
                     ["s", "X", "X", "X", "X", "X", "O"],
                     ["O", "O", "O", "O", "X", "X", "O"],
                     ["X", "X", "X", "O", "X", "X", "O"],
                     ["X", "X", "X", "O", "X", "X", "O"],
                     ["X", "X", "O", "O", "O", "X", "O"],
                     ["X", "X", "O", "O", "O", "X", "S"],
                     ["X", "X", "O", "O", "O", "X", "X"]];
//Floor 2 Map
let dungeonFloor1 = [["X", "X", "X", "h", "X", "e", "X"], 
                     ["O", "O", "O", "O", "O", "E", "X"],
                     ["O", "X", "X", "O", "X", "X", "f"],
                     ["O", "X", "X", "O", "X", "h", "F"],
                     ["a", "X", "X", "O", "X", "X", "O"],
                     ["X", "X", "O", "O", "O", "X", "E"],
                     ["S", "W", "O", "O", "O", "F", "O"],
                     ["X", "X", "O", "O", "O", "X", "X"]];
//Floor 3 Map
let dungeonFloor2 = [["G", "X", "X", "i", "X", "X", "S"], 
                     ["F", "X", "O", "I", "O", "X", "A"],
                     ["O", "X", "E", "X", "h", "X", "O"],
                     ["E", "X", "O", "I", "X", "X", "F"],
                     ["O", "X", "X", "O", "X", "X", "O"],
                     ["I", "X", "O", "O", "O", "X", "E"],
                     ["O", "X", "O", "O", "O", "X", "O"],
                     ["F", "O", "O", "O", "O", "O", "I"]];
//Floor 4 Map
let dungeonFloor3 = [["X", "O", "O", "O", "X", "X", "X", "X", "X", "X", "X", "E", "O", "I", "O", "A"], 
                     ["X", "h", "h", "h", "X", "X", "X", "X", "X", "X", "X", "O", "X", "X", "X", "O"],
                     ["X", "O", "O", "O", "X", "X", "X", "X", "X", "X", "X", "O", "X", "h", "X", "O"],
                     ["X", "X", "W", "X", "X", "X", "X", "X", "X", "X", "X", "O", "X", "E", "X", "F"],
                     ["F", "O", "O", "X", "X", "X", "X", "X", "X", "X", "X", "O", "X", "O", "X", "O"],
                     ["O", "X", "X", "X", "X", "X", "O", "O", "O", "O", "O", "F", "O", "O", "X", "O"],
                     ["E", "X", "A", "O", "I", "O", "O", "O", "O", "X", "X", "O", "X", "X", "X", "E"],
                     ["O", "X", "O", "X", "X", "X", "O", "O", "O", "X", "X", "O", "X", "X", "X", "O"],
                     ["A", "X", "E", "X", "X", "X", "O", "X", "X", "X", "X", "O", "O", "O", "X", "O"],
                     ["O", "X", "O", "X", "X", "X", "O", "X", "O", "O", "O", "X", "X", "O", "X", "I"],
                     ["I", "O", "F", "X", "X", "X", "O", "X", "O", "G", "O", "X", "X", "A", "X", "O"],
                     ["X", "X", "X", "O", "O", "O", "O", "X", "O", "O", "O", "X", "X", "h", "X", "O"],
                     ["X", "X", "X", "O", "X", "X", "X", "X", "X", "A", "X", "X", "X", "X", "X", "A"],
                     ["X", "X", "X", "O", "O", "h", "X", "X", "X", "I", "O", "E", "O", "F", "O", "O"]];