import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
    body {
        background-color: #000
    }
`;

export const ContainerStyled = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const BoxedStyled = styled("div")`
  width: 600px;
  height: 600px;
  border: solid 5px #eee;
  display: flex;
  flex-wrap: wrap;
`;

type BoxType = {
  colorB: 1 | 2;
  active?: boolean;
};
export const BoxStyled = styled("div")<BoxType>`
  background-color: ${(props) => props.colorB === 1 && "#fff"};
  width: 12.5%;
  height: 12.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  position: relative;
  color: white;
  cursor: pointer;
  &::after {
    ${(props) =>
      props.active === true &&
      `
      content: "";
      position: absolute;
      width: 80%;
      height: 80%;
      border: 3px #555252 solid;
      padding: 1px;
    `}
  }
  img {
    height: 70%;
  }
`;
