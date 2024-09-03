import {act, render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pipeline } from './Pipeline';
import '@testing-library/jest-dom';
import React from 'react';
import { theme } from '../theme';
import { ThemeProvider } from 'styled-components';

export const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Pipeline Component', () => {
  it(`GIVEN the Pipeline component with isLoading set to true
      WHEN the component is rendered
      THEN it should display a loading indicator`, () => {
    const props = {
      type: 'Deterministic',
      state: 'idle',
      onTransition: () => {},
      states: [],
      error: null,
      isLoading: true,
    };

    renderWithTheme(<Pipeline {...props} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it(`GIVEN the Pipeline component with an error
      WHEN the component is rendered
      THEN it should display the error message`, () => {
    const props = {
      type: 'Deterministic',
      state: 'idle',
      onTransition: () => {},
      states: [],
      error: new Error('Something went wrong'),
      isLoading: false,
    };

    renderWithTheme(<Pipeline {...props} />);

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it(`GIVEN  Pipeline component with no states
      WHEN the component is rendered
      THEN it should render without errors and indicate no states`, () => {
    const props = {
      type: 'Deterministic',
      state: 'idle',
      onTransition: () => {},
      states: [],
      error: null,
      isLoading: false,
    };

    renderWithTheme(<Pipeline {...props} />);

    expect(
      screen.getByText('Deterministic Manual Pipeline')
    ).toBeInTheDocument();
    expect(screen.queryByText('idle'.toUpperCase())).not.toBeInTheDocument();
    expect(screen.queryByText('active'.toUpperCase())).not.toBeInTheDocument();
  });

  it(`GIVEN Pipeline component with success states
      WHEN clicking on success button
      THEN active job should be current one`, () => {
    const props = {
      type: 'Deterministic',
      state: 'active',
      onTransition: () => {},
      states: [
        { name: 'idle', on: { success: ['active'] } },
        { name: 'active', on: {} },
      ],
      error: null,
      isLoading: false,
    };

    renderWithTheme(<Pipeline {...props} />);

    expect(
      screen.getByText('Deterministic Manual Pipeline')
    ).toBeInTheDocument();
    expect(screen.getByText('idle'.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText('active'.toUpperCase())).toBeInTheDocument();

    const activeStateButton = screen.getByText('idle'.toUpperCase()).closest('button');
    act(() => {
      activeStateButton?.click();
    })
    const activeJob = screen.getByTestId('current');
    expect(activeJob).toHaveTextContent('active'.toUpperCase());

  });
  it(`GIVEN Pipeline component with failure states
      WHEN clicking on failure button
      THEN review job should current and pipeline should be red`, () => {})
});
