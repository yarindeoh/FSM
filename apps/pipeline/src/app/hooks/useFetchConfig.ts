import { useState, useEffect } from 'react';
import { FSMConfig } from '../FSM/types';
import { customFetch } from '../api/customFetch';
import { BASE_URL } from '../api/consts';

export const useFetchConfig = (fetchUrl: string, fetchClient = fetch) => {
  const [config, setConfig] = useState<FSMConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetchClient(`${BASE_URL}${fetchUrl}`);
        if (!res.ok) {
          res = await customFetch(fetchUrl);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
        }
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        console.error('Fetch failed:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [fetchUrl, fetchClient]);

  return { config, error, loading };
};
