import {
  IndexType,
  ItemSelectType,
  ListType,
  PlayersPositionType,
  PlayerTurnType,
} from "../types";

/* eslint-disable @typescript-eslint/no-unused-expressions */
export const VerifyIfExistPart = (
  playersPosition: PlayersPositionType,
  index: IndexType
) => {
  const Player1 = playersPosition.player1[index[0]].includes(index[1]);
  const Player2 = playersPosition.player2[index[0]].includes(index[1]);
  return Player1 || Player2 ? true : false;
};

export const verifyIfNotIsWhiteSquare = (list: ListType, index: IndexType) => {
  return list[index[0]][index[1]] === 1 ? true : false;
};

export const VerifyClickInOpponent = (
  playersPosition: PlayersPositionType,
  playerTurn: PlayerTurnType,
  index: IndexType
) => {
  return playersPosition["player" + playerTurn][index[0]].includes(index[1])
    ? true
    : false;
};

export const VerifyBigDiagonalJump = (
  itenSelect: ItemSelectType,
  index: IndexType
) => {
  const y = itenSelect[0] - index[0];
  const x = itenSelect[1] - index[1];
  return y > 2 || y < -2 || x > 2 || x < -2 ? true : false;
};

export const VerifyBigHorizontalAndVerticalJump = (
  itenSelect: ItemSelectType,
  index: IndexType
) => {
  if (itenSelect[0] === index[0]) {
    return true;
  }
  if (itenSelect[1] === index[1]) {
    return true;
  }
};
