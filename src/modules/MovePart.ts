import {
  PlayersPositionType,
  IndexType,
  ItemSelectType,
  PlayerTurnType,
} from "../types/index";

export const DeletePartPlayer = (
  playersPosition: PlayersPositionType,
  playerTurn: PlayerTurnType,
  itenSelect: ItemSelectType
) => {
  return {
    ...playersPosition,
    [`player${playerTurn}`]: {
      ...playersPosition["player" + playerTurn],
      [itenSelect[0]]: playersPosition["player" + playerTurn][
        itenSelect[0]
      ].filter((item: any) => item !== itenSelect[1]),
    },
  };
};

export const movePart = (
  playersPosition: PlayersPositionType,
  playerTurn: PlayerTurnType,
  itenSelect: ItemSelectType,
  index: IndexType
) => {
  // Remove
  const deleteData = DeletePartPlayer(playersPosition, playerTurn, itenSelect);
  // add
  const newData = {
    ...deleteData,
    [`player${playerTurn}`]: {
      ...deleteData["player" + playerTurn],
      [index[0]]: [...deleteData["player" + playerTurn][index[0]], index[1]],
    },
  };

  return newData;
};
