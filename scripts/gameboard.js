import { shipFactory } from "./ship.js";

export function gameboardFactory(board) {
  board = [];
  let tempArr = [];
  let hitLocations = [];
  let shipsOnBoard = [];
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  function _createInitialBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        tempArr.push({
          hit: false,
          location: [alpha[i], j],
          shipPresent: false,
        });
      }
    }
    board = tempArr;
  }
  _createInitialBoard();

  function placeShip(board, location) {
    if (_invalidLocation(location)) {
      console.log("invalid location input");
      return;
    }
    let nose = location;
    let tempShip = shipFactory(3, 0, false);
    tempShip.shipOrientation(tempShip, "north");
    let direction = tempShip.shipDirection;
    let validity = true;
    validity = _validLocation(board.board, tempShip, nose);
    if (validity == true) {
      for (let i = 0; i < tempShip.length; i++) {
        if (direction == "north") {
          tempShip.locationArray.push([nose[0], nose[1] - i]);
        } else if (direction == "south") {
          tempShip.locationArray.push([nose[0], nose[1] + i]);
        } else if (direction == "east") {
          tempShip.locationArray.push([nose[0] - i, nose[1]]);
        } else if (direction == "west") {
          tempShip.locationArray.push([nose[0] + i, nose[1]]);
        }
      }
    }
    shipsOnBoard.push(tempShip);
    _updateBoardLocations(tempShip);
    return tempShip;
  }

  function _validLocation(board, ship, location) {
    let nose = location;
    let validTallies = 0;

    for (let i = 0; i < ship.length; i++) {
      if (ship.shipDirection == "north") {
        board.forEach((square) => {
          if (
            square.location[0] == nose[0] &&
            square.location[1] == nose[1] - i
          ) {
            if (square.hit == true || square.shipPresent == true) {
              console.log("invalid");
            } else {
              console.log("valid");
              validTallies++;
            }
          }
        });
      } else if (ship.shipDirection == "south") {
        board.forEach((square) => {
          if (
            square.location[0] == nose[0] &&
            square.location[1] == nose[1] + i
          ) {
            if (square.hit == true || square.shipPresent == true) {
              console.log("invalid");
            } else {
              console.log("valid");
              validTallies++;
            }
          }
        });
      } else if (ship.shipDirection == "east") {
        board.forEach((square) => {
          if (
            square.location[0] == nose[0] - i &&
            square.location[1] == nose[1]
          ) {
            if (square.hit == true || square.shipPresent == true) {
              console.log("invalid");
            } else {
              console.log("valid");
              validTallies++;
            }
          }
        });
      } else if (ship.shipDirection == "west") {
        board.forEach((square) => {
          if (
            square.location[0] == nose[0] + i &&
            square.location[1] == nose[1]
          ) {
            if (square.hit == true || square.shipPresent == true) {
              console.log("invalid");
            } else {
              console.log("valid");
              validTallies++;
            }
          }
        });
      }
    }
    if (validTallies == ship.length) {
      return true;
    } else {
      return false;
    }
  }

  function receiveAttack(coordinates) {
    if (_validAttack(coordinates) != true) {
      console.log("Invalid attack");
      return;
    }
    for (let i = 0; i < shipsOnBoard.length; i++) {
      for (let j = 0; j < shipsOnBoard[i].length; j++) {
        if (
          coordinates.toString() == shipsOnBoard[i].locationArray[j].toString()
        ) {
          shipsOnBoard[i].hit(shipsOnBoard[i]);
          shipsOnBoard[i].isSunk(shipsOnBoard[i]);
        }
      }
    }
    hitLocations.push(coordinates);
    _updateBoardHits(coordinates);
  }

  function _validAttack(locationInput) {
    let attackExists = false;
    if (hitLocations.length == 0) {
      return true;
    }

    attackExists = hitLocations.some(
      (location) => location.toString() == locationInput.toString()
    );

    if (attackExists) {
      return false;
    } else {
      return true;
    }
  }

  function _updateBoardLocations(ship) {
    ship.locationArray.forEach((location) => {
      board.forEach((square) => {
        if (square.location.toString() == location.toString()) {
          square.shipPresent = true;
        }
      });
    });
  }

  function _updateBoardHits(hitInput) {
    board.forEach((square) => {
      if (square.location.toString() == hitInput.toString()) {
        square.hit = true;
      }
    });
  }

  function _invalidLocation(input) {
    if (input[1] > 9 || input[1] < 0) {
      return true;
    }

    if (typeof input[0] != "string") {
      return true;
    }

    if (!alpha.includes(input[0].toUpperCase())) {
      return true;
    }

    return false;
  }
  return {
    board,
    hitLocations,
    shipsOnBoard,
    placeShip,
    receiveAttack,
  };
}
