/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BoxedStyled, ContainerStyled, BoxStyled } from "./style";

import PDark from "./assets/p-dark.png";
import PLigth from "./assets/p-ligth.png";

const App = () => {
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
  }, [itenSelect, playersPosition]);

  const ActivePart = (index: Array<number>) => {
    console.log(itenSelect.length);
    if (!itenSelect.length) {
      // Recebe a posição atual
      setItemSelect(index);
    } else {
      // Remove
      const deleteData = {
        ...playersPosition,
        player2: {
          ...playersPosition.player2,
          [itenSelect[0]]: playersPosition.player2[itenSelect[0]].filter(
            (item: any) => item !== itenSelect[1]
          ),
        },
      };
      // add
      const newData = {
        ...deleteData,
        player2: {
          ...deleteData.player2,
          [index[0]]: [...deleteData.player2[index[0]], index[1]],
        },
      };
      setPlayersPosition(newData);
      setItemSelect([]);
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
