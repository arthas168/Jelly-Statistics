import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getHistory } from './actions';

const UPDATE = 'UPDATE';

const HistoryContext = createContext();

function useHistoryContext() {
  return useContext(HistoryContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const swaps = payload;

      return {
        ...state,
        swaps
      };
    }
    default: {
      throw Error(`Unexpected action type in LiquidityContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback(swaps => {
    dispatch({ type: UPDATE, payload: swaps });
  }, []);

  useEffect(() => {
    function get() {
      getHistory().then(swaps => {
        update(swaps);
      });
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HistoryContext.Provider
      value={useMemo(() => {
        return {
          state,
          update
        };
      }, [state, update])}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useSwaps() {
  const { state } = useHistoryContext();
  return safeAccess(state, ['swaps']);
}
