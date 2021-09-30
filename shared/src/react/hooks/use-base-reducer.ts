import { useCallback, useReducer } from 'react'
import { unreachable } from '../../helpers/types'
import { uniqBy } from 'lodash'

export type BaseReducerAction <T> = {
  type: 'SET'
  payload: {
    data: T[]
  }
} | {
  type: 'UPDATE'
  payload: {
    data: T
  }
} | {
  type: 'ADD'
  payload: {
    data: T[]
  }
} | {
  type: 'REMOVE'
  payload: {
    data: T
  }
}

export function useBaseReducer <State> (key: keyof State, initialState: State[] = []) {
  return useReducer(useCallback((
    state: State[],
    action: BaseReducerAction<State>
  ) => {
    const { type } = action
    switch (type) {
      case 'SET': {
        const { data } = action.payload
        return data
      }
      case 'UPDATE': {
        const { data } = action.payload
        const _state = [...state]
        const index = _state.findIndex(item => item[key] === data[key])
        if (index >= 0) _state[index] = action.payload.data
        return _state
      }
      case 'ADD': {
        const { data } = action.payload
        return uniqBy([...state, ...data], key)
      }
      case 'REMOVE': {
        const { data } = action.payload
        return [...state].filter(item => item[key] !== data[key])
      }
      default: {
        unreachable(type)
        return state
      }
    }
  }, [key]), initialState)
}
