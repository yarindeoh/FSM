import React from 'react';
import styled, { ThemeProps, ThemeProvider } from 'styled-components';
import { NonDeterministicPipeline } from './components/NonDeterministicPipeline';
import { DeterministicPipeline } from './components/DeterministicPipeline';
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import { StyledRow } from './components/Pipeline';

export function App() {
  console.log('App');
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <StyledHeader>CI Pipeline</StyledHeader>
        <StyledInfoRow>
          Each job in the pipeline can transitioned to success/failure, click on
          each job to fulfill the pipeline
        </StyledInfoRow>
        <StyledPipelines>
          <DeterministicPipeline />
          <NonDeterministicPipeline />
        </StyledPipelines>
      </StyledApp>
    </ThemeProvider>
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
  margin-top: ${(props) => props.theme.spacing.md};
`;

const StyledPipelines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledInfoRow = styled.div`
  ${StyledRow};
`;

export default App;
