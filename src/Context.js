import React, { createContext, useContext, useReducer } from 'react';

const initalHasTag = [
  { id: 1, tag: '#감성카페', status: false },
  { id: 2, tag: '#이쁜카페', status: false },
  { id: 3, tag: '#디저트', status: false },
];

function reducer(state, action) {
  switch (action.type) {
    case 'TAGOFF':
      return state.map((tag) => (tag.id === action.id ? { ...tag, status: !tag.status } : tag));
    default:
      throw new Error('액션타입이 안맞습니다..........');
  }
}

const hashTagStateContext = createContext();
const hashTagDispatchContext = createContext();

export function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initalHasTag);
  return (
    <hashTagStateContext.Provider value={state}>
      <hashTagDispatchContext.Provider value={dispatch}>{children}</hashTagDispatchContext.Provider>
    </hashTagStateContext.Provider>
  );
}

export const useHashTagState = () => {
  return useContext(hashTagStateContext);
};

export const useHashTagDispatch = () => {
  return useContext(hashTagDispatchContext);
};
