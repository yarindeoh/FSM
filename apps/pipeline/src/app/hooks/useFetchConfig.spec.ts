import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useFetchConfig } from './useFetchConfig';

describe('useFetchConfig Hook', () => {
  const mockFetch = vi.fn();
  const fetchUrl = '/test-config';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`GIVEN fetchUrl is provided
      WHEN  fetchClient is called
      THEN config data with loading=false and error=null should returned`, async () => {
    const mockConfig = {
      initialState: 'idle',
      type: 'Deterministic',
      states: [],
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockConfig,
    });

    const { result } = renderHook(() => useFetchConfig(fetchUrl, mockFetch));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.config).toEqual(mockConfig);
    expect(result.current.error).toBe(null);
  });

  it(`GIVEN fetchClient fails
      WHEN useFetchConfig is called
      THEN fetch error should be returned with loading=false and config=null`, async () => {
    const fetchError = new Error('Fetch failed');
    mockFetch.mockRejectedValueOnce(fetchError);

    const { result } = renderHook(() => useFetchConfig(fetchUrl, mockFetch));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.config).toBe(null);
    expect(result.current.error).toBe(fetchError);
  });

  it(`GIVEN fetchUrl is provided but the primary fetch fails
      WHEN useFetchConfig is called
      THEN the hook should fall back to customFetch, return the config data if successful, with loading set to false and error as null`);
});
