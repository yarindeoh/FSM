import React, { useEffect } from 'react';
import { Pipeline } from './Pipeline';
import { useFSM } from '../hooks/useFSM';
import { useFetchConfig } from '../hooks/useFetchConfig';
import { BASE_URL } from '../api/consts';

export const DeterministicPipeline = () => {
  const { state, onTransition, setConfig } = useFSM();
  const { config, loading, error } = useFetchConfig(
    `${BASE_URL}/api/config?pipelineId=1`
  );

  useEffect(() => {
    if (config) {
      setConfig(config);
    }
  }, [setConfig, config]);

  // TODO:: handle loading and error states in beautiful components
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {config && (
        <Pipeline
          type="Deterministic"
          state={state}
          onTransition={onTransition}
          states={config.states}
        />
      )}
    </>
  );
};
