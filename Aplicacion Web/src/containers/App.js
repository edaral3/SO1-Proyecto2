import React, { Component } from 'react';
import PostForm from './PostForm';
import Posts from './Posts';
import styled from 'styled-components';
import DynamicMultiSeriesChart from "./Dynamic Multi Series Chart";
import DynamicMultiSeriesChart2 from "./Dynamic Multi Series Chart2";


const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;


class App extends Component {
  render() {
    return (
      <Container>
        <h1>CASOS</h1>
        <h2>DEPARTAMENTOS CON MAS CASOS</h2>
        <Posts />
        <h2>ULTIMO CASO AGREGADO</h2>
        <PostForm />
        <h1>GRAFICAS</h1>
        <DynamicMultiSeriesChart2 />
        <DynamicMultiSeriesChart />
        
      </Container>
    );
  }
}

export default App;
