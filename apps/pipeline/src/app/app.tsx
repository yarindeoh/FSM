import React from 'react';
import styled, { ThemeProps, ThemeProvider } from 'styled-components';
import { DeterministicPipeline } from './components/DeterministicPipeline';

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledApp>
          <StyledHeader>CI Pipeline</StyledHeader>
          <StyledPipelines>
            <DeterministicPipeline />
          </StyledPipelines>
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Roboto, sans-serif;
    font-size: ${(props) => props.theme.font.md};
    background-color:  ${(props: ThemeProps<typeof theme>) =>
      props.theme.color.primary};
  }
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.color.info};

`;

const StyledHeader = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.font.xl};
  justify-content: center;
  text-align: center;
  margin: ${(props) => props.theme.spacing.md};
`;

const StyledPipelines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default App;
