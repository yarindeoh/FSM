import React, { useEffect } from 'react';
import { Pipeline } from './Pipeline';
import { useFSM } from '../hooks/useFSM';
import { useFetchConfig } from '../hooks/useFetchConfig';

export const DeterministicPipeline = ({
  fetchClient,
}: {
  fetchClient: typeof fetch;
}) => {
  const { state, onTransition, setConfig } = useFSM();
  const { config, loading, error } = useFetchConfig(
    '/api/config?pipelineId=1',
    fetchClient
  );

  useEffect(() => {
    if (config) {
      setConfig(config);
    }
  }, [setConfig, config]);

  return (
    <Pipeline
      type={config?.type}
      state={state}
      onTransition={onTransition}
      states={config?.states}
      error={error}
      isLoading={loading}
    />
  );
};
