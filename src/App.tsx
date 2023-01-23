/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BoxedStyled, ContainerStyled, BoxStyled } from "./style";

import PDark from "./assets/p-dark.png";
import PLigth from "./assets/p-ligth.png";
import {
  VerifyBigDiagonalJump,
  VerifyBigHorizontalAndVerticalJump,
  VerifyClickInOpponent,
  VerifyIfExistPart,
  VerifyMoveBack,
  verifyIfNotIsWhiteSquare,
} from "./modules/Verify";
import { DeletePartPlayer, movePart } from "./modules/MovePart";
import { RemoveSelectSquare } from "./modules/RemoveSelectSquare";

const App = () => {
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(2);
  const dama = {
    player2: [
      [0, 1],
      [0, 3],
      [0, 5],
      [0, 7],
    ],
    player: [
      [7, 0],
      [7, 2],
      [7, 4],
      [7, 6],
    ],
  };

  const [itenSelect, setItemSelect] = useState<Array<number>>([]);
  const [list, setList] = useState<Array<Array<1 | 2>>>([]);
  const [playersPosition, setPlayersPosition] = useState<any>({
    player1: {
      0: [1, 3, 5, 7],
      1: [0, 2, 4, 6],
      2: [1, 3, 5, 7],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    },
    player2: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [0, 2, 4, 6],
      6: [1, 3, 5, 7],
      7: [0, 2, 4, 6],
    },
  });

  useEffect(() => {
    setList([
      [1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2, 1],
    ]);
  }, [itenSelect, playersPosition, setPlayersPosition]);

  const ActivePart = (index: Array<number>) => {
    if (RemoveSelectSquare(itenSelect, index)) {
      // checa se são iguais
      console.log("! Remove seleção de quadrado");
      setItemSelect([]);
      return;
    }

    // primeiro click
    if (!itenSelect.length) {
      // Verify se o selecionado uma peça sua
      if (!VerifyClickInOpponent(playersPosition, playerTurn, index)) {
        console.log("! Nesse quadrado não tem peça sua");
        return;
      }

      // Recebe a posição atual
      setItemSelect(index);
    }

    // segundo click
    else {
      // Verifica se não tem uma peça já naquele lugar
      if (VerifyIfExistPart(playersPosition, index)) {
        console.log("! Já existe peça nesse quadrado");
        return;
      }

      // Verifica se o salto diagonal foi maior do que o aceitável
      if (VerifyBigDiagonalJump(itenSelect, index)) {
        console.log("Salto maior do que o permitido");
        return;
      }

      // Verifica se o salto vertical e horizontal foi maior do que o aceitável
      if (VerifyBigHorizontalAndVerticalJump(itenSelect, index)) {
        console.log("Tipo de salto proibido");
        return;
      }

      // Verificar andar um paço para traz
      if (VerifyMoveBack(playerTurn, itenSelect, index)) {
        console.log("Proibido mover para trás");
        return;
      }

      // Verifyca se não é uma quadrado branco
      if (verifyIfNotIsWhiteSquare(list, index)) {
        console.log("! Proibido andar sobre os quadrados brancos");
        return;
      }
      // verify se existe peça entre o salto
      const x = itenSelect[0] - index[0];
      const y = itenSelect[1] - index[1];
      var newPlayersPosition = null;

      if (x === 2 || (x === -2 && y === 2) || y === -2) {
        // se tiver a mesma cor
        const indexX = (itenSelect[0] + index[0]) / 2;
        const indexY = (itenSelect[1] + index[1]) / 2;
        const verifyExistPart =
          playersPosition[`player${playerTurn === 1 ? 2 : 1}`][indexX].includes(
            indexY
          );
        if (!verifyExistPart) {
          console.log("Não tem peça adversária entre o salto");
          return;
        }
        const deletePartPlayerOposition = DeletePartPlayer(
          playersPosition,
          playerTurn === 1 ? 2 : 1,
          [indexX, indexY]
        );
        newPlayersPosition = deletePartPlayerOposition;
      }
      // Move peça
      const newMovePart = movePart(
        newPlayersPosition ? newPlayersPosition : playersPosition,
        playerTurn,
        itenSelect,
        index
      );
      setPlayersPosition(newMovePart);
      setItemSelect([]);
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
  };

  return (
    <ContainerStyled>
      <BoxedStyled>
        {list &&
          list.map((item, index) =>
            item.map((item2, index2) => (
              <BoxStyled
                key={`${index}-${index2}`}
                colorB={item2}
                active={
                  itenSelect[0] === index && itenSelect[1] === index2
                    ? true
                    : false
                }
                onClick={() => ActivePart([index, index2])}
              >
                {playersPosition.player1[index].includes(index2) && (
                  <img src={PDark} alt="icone de peça preta" />
                )}
                {playersPosition.player2[index].includes(index2) && (
                  <img src={PLigth} alt="icone de peça branca" />
                )}
              </BoxStyled>
            ))
          )}
      </BoxedStyled>
    </ContainerStyled>
  );
};

export default App;
