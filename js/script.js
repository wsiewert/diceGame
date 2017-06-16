"use strict";
//-----------------GAME LOGO----------------->
function gameLogo(){
  console.log("────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────");
  console.log("─████████████───██████████─██████████████─██████████████────██████████████─██████████████─██████──────────██████─██████████████─");
  console.log("─██░░░░░░░░████─██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██████████████░░██─██░░░░░░░░░░██─");
  console.log("─██░░████░░░░██─████░░████─██░░██████████─██░░██████████────██░░██████████─██░░██████░░██─██░░░░░░░░░░░░░░░░░░██─██░░██████████─");
  console.log("─██░░██──██░░██───██░░██───██░░██─────────██░░██────────────██░░██─────────██░░██──██░░██─██░░██████░░██████░░██─██░░██─────────");
  console.log("─██░░██──██░░██───██░░██───██░░██─────────██░░██████████────██░░██─────────██░░██████░░██─██░░██──██░░██──██░░██─██░░██████████─");
  console.log("─██░░██──██░░██───██░░██───██░░██─────────██░░░░░░░░░░██────██░░██──██████─██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─");
  console.log("─██░░██──██░░██───██░░██───██░░██─────────██░░██████████────██░░██──██░░██─██░░██████░░██─██░░██──██████──██░░██─██░░██████████─");
  console.log("─██░░██──██░░██───██░░██───██░░██─────────██░░██────────────██░░██──██░░██─██░░██──██░░██─██░░██──────────██░░██─██░░██─────────");
  console.log("─██░░████░░░░██─████░░████─██░░██████████─██░░██████████────██░░██████░░██─██░░██──██░░██─██░░██──────────██░░██─██░░██████████─");
  console.log("─██░░░░░░░░████─██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██────██░░░░░░░░░░██─██░░██──██░░██─██░░██──────────██░░██─██░░░░░░░░░░██─");
  console.log("─████████████───██████████─██████████████─██████████████────██████████████─██████──██████─██████──────────██████─██████████████─");
  console.log("────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────");
}



//--------------PLAYER MOVEMENT--------------->
//Return final player position.
function updatePosition(map,roll,position){
  //roll,move,checkmap,moveagain,return.
  let spaceStatus = 0;
  let initialMovePosition = 0;
  let finalMovePosition = 0;

  //Move
  initialMovePosition = move(roll,position);
  //Check Map
  spaceStatus = checkmap(initialMovePosition,map)

  //Move Again
  if (spaceStatus === 0){
    finalMovePosition = initialMovePosition;
  } else if (spaceStatus === 1){
    finalMovePosition = chute(initialMovePosition,map);
  } else if (spaceStatus === 2){
    finalMovePosition = ladder(initialMovePosition,map);
  }
return finalMovePosition;
}

//Moves player down 1-15 spaces.
function chute(position,map){
  let random = randomNumber(1,15);
  let newPosition = position - random;
  let checkSpace = checkmap(newPosition,map);
  let spaceZero = 0;

  if (checkSpace === 1 || checkSpace === 2){
    chuteAlert(random - 1);
    return newPosition + 1;
  } else if (position < random) {
    chuteAlert(position);
    return spaceZero;
  }
  chuteAlert(random);
  return newPosition;
}

//Moves player up 1-15 spaces.
function ladder(position,map){
  let random = randomNumber(1,15);
  let result = position + random;
  ladderAlert(random);
  return result;
}

function move(roll,position){
  let result = roll + position;
  return result;
}

//Returns what you landed on (space, chute, ladder)
function checkmap(position,map){
  let space = 0;
  let chute = 1;
  let ladder = 2;
  let spaceStatus;
  let move = map[position];

  if(move === space){
    spaceStatus = space;
  } else if (move === chute){
    spaceStatus = chute;
  } else if (move === ladder){
    spaceStatus = ladder;
  }
  return spaceStatus;
}

function updateTurn(turn){
  if(turn === 1){
    return 2;
  } else {
    return 1;
  }
}

function checkWin(playerPosition,map){
  let winSpace = map - 1;
  if (playerPosition >= winSpace){
    return true;
  }
  return false;
}



//------USER INPUTS & MESSAGES------>
function rules(){
  alert("Here be thy rules: Its basic chutes and ladders, except the chutes and ladders will jump you randomly 1-15 spaces. Remember this is a console game, so open up your console to see updates. Player 1 goes first. Good Luck!");
}

function logMap(map){
  console.log(map);
}

function logMapDescription(description){
  console.log(description);
}

function alertDiceRoll(player){
  let roll = alert("Player " + player + " your turn to roll. Click okay to roll.");
  return roll;
}

function ladderAlert(spaces){
  alert("You landed on a Ladder.");
  console.log("You landed on a ladder");
  console.log("You climbed " + spaces + " spaces");
}

function chuteAlert(spaces){
  alert("You landed on a Chute.");
  console.log("You landed on a chute");
  console.log("You fell " + spaces + " spaces");
}

function alertPlayerPosition(position){
  alert("You're position now is " + position);
}

function winnerAlert(player){
  alert("player " + player + " is the winnner!");
}

function consoleLogger(message){
  console.log(message);
}

function statusUpdate(playerTurn,roll){
  console.log("________________________");
  console.log("PLAYER: " + playerTurn);
  console.log("Roll: " + roll);
}

function promptMapSize(defaultMapSize){
  let mapSize = prompt("Provide the size of the map you want to play on. Must be larger than 20! Choose nothing for defualt map size.");
  if (mapSize === null || mapSize === ""){
    return defaultMapSize;
  }
  return mapSize;
}

function promptDiceSize(defaultDieSize){
  let dieSize = prompt("Choose, 4, 6, 8, 12, or 20 for your die to roll. Choose nothing for default die size.");
  if (dieSize === null || dieSize === ""){
    return defaultDieSize;
  }
  return dieSize;
}



//---------GERNERAL MATH---------->
function randomNumber(start,range){
  let result = Math.floor(Math.random() * range) + start;
  return result;
}

function rollDice(diceSize){
  let diceRoll = Math.floor(Math.random() * diceSize) + 1;
  return diceRoll;
}



//-------------MAP GENERATOR--------------->
//Generates a map 50 spaces. 1/10 chance to spawn a chute or ladder.
function mapGenerator(mapLimits,mapSpaceProbability){
  let mapArray = [];
  let spotsTaken = [];

  for (var i = 0; i < mapLimits; i++) {
    if (i < 2 || i >= (mapLimits - 5)) {
      mapArray.push(0);
      continue;
    }
    mapArray.push(generateSpace(mapArray,spotsTaken));
    if (mapArray[i] != 0){
      spotsTaken.push(mapArray[i]);
    }
  }
  return mapArray;
}

//Generates a space, a chute or a ladder at random.
function generateSpace(mapArray,spotsTaken){
  let space = 0;
  let chute = 1;
  let ladder = 2;
  let generateSpace = randomNumber(1,100);
  let resultSpace;

  if(generateSpace >= 80){
    if (spotsTaken.length === 0){
      resultSpace = initializeSpace(spotsTaken,chute,ladder);
    }
    if(mapArray[mapArray.length-1] === 0){
      if (spotsTaken[spotsTaken.length-1] === chute){
        resultSpace = ladder;
      } else if (spotsTaken[spotsTaken.length-1] === ladder){
        resultSpace = chute;
      }
    } else {
      resultSpace = space;
    }
  } else {
    resultSpace = space;
  }
  return resultSpace;
}

//Initializes first chute or ladder for array.
function initializeSpace(spotsTaken,chute,ladder){
  let halfChance = randomNumber(1,2);
  let resultSpace;

  if (halfChance === 1 && spotsTaken.length < 1){
    resultSpace = chute;
  } else if (halfChance === 2 && spotsTaken.length < 1){
    resultSpace = ladder;
  }
  return resultSpace;
}



//-------------RUN GAME MANAGER--------------->
function gameManager(){
  let defaultMapSize = 50;
  let defaultDieSize = 6;
  let mapSpaces = promptMapSize(defaultMapSize);
  let dieSize = promptDiceSize(defaultDieSize);
  let gerneratedMap = mapGenerator(mapSpaces);
  let playerTurn = 1;
  let player1Position = 0;
  let player2Position = 0;
  let currentPlayerPosition = 0;
  let winner = false;
  let roll = 0;

  rules();
  gameLogo();
  logMap(gerneratedMap);
  logMapDescription("MAP^ - (0 = empty space, 1 = chute, 2 = ladder)");

  while(winner === false){
    alertDiceRoll(playerTurn);

    //Return--> Dice Roll
    roll = rollDice(dieSize);

    //Log player positions and rolls
    statusUpdate(playerTurn,roll);

    //Changes current player position to player 1 or 2's position
    if(playerTurn === 1){
      currentPlayerPosition = player1Position;
    } else if (playerTurn === 2){
      currentPlayerPosition = player2Position;
    }

    //Return--> currentPlayerPosition (add both player pos and roll)
    currentPlayerPosition = updatePosition(gerneratedMap,roll,currentPlayerPosition);

    //Updates the correct player with the new positions
    if (playerTurn === 1){
      player1Position = currentPlayerPosition;
    } else if (playerTurn === 2) {
      player2Position = currentPlayerPosition;
    }

    console.log("Player " + playerTurn + " is at space: " + currentPlayerPosition);

    //Return--> True/False
    winner = checkWin(currentPlayerPosition,mapSpaces);
    if (winner === true){
      winnerAlert(playerTurn);
      console.log("Player " + playerTurn + " Wins!");
    }

    //Return--> changes turn (1 -> 2) (2 -> 1)
    playerTurn = updateTurn(playerTurn);
  }
}

gameManager();
