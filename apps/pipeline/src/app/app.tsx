import React from 'react';
import styled from 'styled-components';
import { DeterministicPipeline } from './components/DeterministicPipeline';

import { createGlobalStyle } from 'styled-components';

export function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <StyledHeader>CI Pipeline</StyledHeader>
      <StyledPipelines>
        <DeterministicPipeline />
      </StyledPipelines>
    </StyledApp>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    color: white;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: #0d1117;
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: flex;
  font-size: 28px;
  justify-content: center;
  text-align: center;
`;

const StyledPipelines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default App;
