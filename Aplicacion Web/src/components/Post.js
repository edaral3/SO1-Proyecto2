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

const Post = ({ autor, frase }) => {
  return (
    <Container>
      <h1>{autor}</h1>
      <p>Cantidad: {frase}</p>
    </Container>
  );
};

export default Post;
