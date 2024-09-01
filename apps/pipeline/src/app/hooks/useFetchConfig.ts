import { useState, useEffect } from 'react';
import { FSMConfig } from '../FSM/types';
import { customFetch } from '../api/config';

export const useFetchConfig = (fetchUrl: string, fetchClient = fetch) => {
  const [config, setConfig] = useState<FSMConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchClient(fetchUrl);
        if (!res.ok) {
          const fallbackRes = await customFetch('/api/config?pipelineId=1');
          if (!fallbackRes.ok) {
            throw new Error('Network response was not ok');
          }
        }
        const data = await res.json();
        setConfig(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [fetchUrl, fetchClient]);

  return { config, error, loading };
};
