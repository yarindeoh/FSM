import React from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { describe, expect, it } from 'vitest';
import App from './app';
import { customFetch } from './api/customFetch';

export const renderWrapper = ({ fetchUrl = '/api/config?pipelineId=1' }) => {
  return render(
    <ThemeProvider theme={theme}>
      <App fetchClient={() => customFetch(fetchUrl)} />
    </ThemeProvider>
  );
};

describe('App Component', () => {
  it(`GIVEN fsm application
      WHEN the application is rendered
      THEN it should display a loading indicator`, async () => {
    renderWrapper({ fetchUrl: '/api/config?pipelineId=1' });

    expect(screen.getAllByText('Loading...')[0]).toBeInTheDocument();
  });
  it(`GIVEN fsm application rendered
      WHEN fetch failed
      THEN it should display the error message`, async () => {
    renderWrapper({ fetchUrl: '/api/config?pipelineId=3' });
    const error = await screen.findAllByText('Error: No pipeline found');
    expect(error[0]).toBeInTheDocument();
  });
  it(`GIVEN fsm application rendered
      WHEN clicking on verification success button
      THEN quality job should be current one`, async () => {
    renderWrapper({ fetchUrl: '/api/config?pipelineId=1' });
    const deterministicPipeline = await screen.findAllByText(
      'Deterministic Manual Pipeline'
    );
    expect(deterministicPipeline[0]).toBeInTheDocument();
    const verificationJob = screen.getAllByTestId('current')[0];
    expect(verificationJob).toBeInTheDocument();

    const activeStateButton = within(verificationJob).getByTestId('success');
    act(() => {
      activeStateButton?.click();
    });
    const activeJob = await screen.findAllByTestId('current');
    await waitFor(async () => {
      expect(activeJob[0]).toHaveTextContent('QUALITY');
    });
  });

  it(`GIVEN fsm app with current quality job
      WHEN quality job is failing
      THEN review job should current and pipeline should be red`, async () => {
    renderWrapper({ fetchUrl: '/api/config?pipelineId=1' });
    const deterministicPipeline = await screen.findAllByText(
      'Deterministic Manual Pipeline'
    );
    expect(deterministicPipeline[0]).toBeInTheDocument();
    const verificationJob = screen.getAllByTestId('current')[0];
    expect(verificationJob).toBeInTheDocument();
    const activeStateButton = within(verificationJob).getByTestId('success');
    act(() => {
      activeStateButton.click();
    });
    const activeJob = await screen.findAllByTestId('current');
    await waitFor(async () => {
      expect(activeJob[0]).toHaveTextContent('QUALITY');
    });
    await waitFor(async () => {
      const failureButton = within(activeJob[0]).getByTestId('failure');
      failureButton.click();
      const cu = await screen.findAllByTestId('current');
      expect(cu[0]).toHaveTextContent('REVIEW');
    });
  });
  //TODO:: implement near critical path tests
  it(`GIVEN fsm app with non deterministic pipeline
      WHEN verification job is successful
      THEN quality job second shard should be selected`,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {});
});
