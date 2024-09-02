import React, { useEffect } from 'react';
import { useFSM } from '../hooks/useFSM';
import { Pipeline } from './Pipeline';
import { useFetchConfig } from '../hooks/useFetchConfig';

export const NonDeterministicPipeline = () => {
  const { state, onTransition, setConfig } = useFSM();
  const { config, loading, error } = useFetchConfig('/api/config?pipelineId=2');

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
