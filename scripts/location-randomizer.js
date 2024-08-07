export function generateShipLocation(inputBoard, player) {
  let directions = ["north", "south", "east", "west"];
  let randomNumber = 100;
  let defaultLength = 5;
  while (randomNumber < 0 || randomNumber > 3) {
    randomNumber = Math.floor(Math.random() * 10);
  }
  let randomDirection = directions[randomNumber];

  let letters = inputBoard.alpha;
  let randomLetter = "z";
  while (!inputBoard.alpha.includes(randomLetter.toUpperCase())) {
    randomLetter = inputBoard.alpha[Math.floor(Math.random() * 10)];
  }

  let randomCoordinate = 101;
  while (randomCoordinate > 10 || randomCoordinate < 0) {
    randomCoordinate = Math.floor(Math.random() * 10);
  }

  if (inputBoard.captainShips.length < 1) {
    defaultLength = 5;
  } else if (inputBoard.largeShips.length < 1) {
    defaultLength = 4;
  } else if (inputBoard.mediumShips.length < 2) {
    defaultLength = 3;
  } else if (inputBoard.smallShips.length < 1) {
    defaultLength = 2;
  } else {
    return;
  }

  let name = `randomShip${inputBoard.shipsOnBoard.length}`;
  if (defaultLength == 5) {
    name = `${player.playerName}CaptainShip`;
  } else if (defaultLength == 4) {
    name = `${player.playerName}LargeShip`;
  } else if (defaultLength == 3) {
    name = `${player.playerName}MediumShip`;
  } else if (defaultLength == 2) {
    name = `${player.playerName}SmallShip`;
  }
  inputBoard.placeShip(inputBoard, [randomLetter, randomCoordinate], randomDirection, name, defaultLength, player);
}
