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
  it(`GIVEN  Pipeline component with no states
      WHEN the component is rendered
      THEN it should render without errors and indicate no states`, () => {
    const props = {
      type: 'Deterministic',
      state: 'idle',
      onTransition: vi.fn(),
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
});
