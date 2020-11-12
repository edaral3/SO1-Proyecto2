import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 2px solid #333;
  box-sizing: border-box;
  flex-grow: 1;
  margin: 10px;
  min-width: 280px;
  padding: 0 20px;
  width: 30%;
  background-color: #fff;
`;

const Post2 = ({ autor, frase, age, type, state }) => {
  return (
    <Container>
      <h1>{autor}</h1>
      <p>Ubicacion: {frase}</p>
      <p>Edad: {age}</p>
      <p>Tipo: {type}</p>
      <p>Estado: {state}</p>
    </Container>
  );
};

export default Post2;
