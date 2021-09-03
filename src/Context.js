import React, { createContext, useContext, useReducer } from 'react';

const initalHasTag = [
  { id: 1, tag: '#감성카페', status: false },
  { id: 2, tag: '#이쁜카페', status: false },
  { id: 3, tag: '#분위기 좋은 카페', status: false },
  { id: 4, tag: '#프랜차이즈', status: false },
];

const hashContents = [
  {
    id: 1,
    tag: '#감성카페',
    title: '스타벅스',
    image:
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: 2,
    tag: '#이쁜카페',
    title: '망원다방',
    image:
      'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
  },
  {
    id: 3,
    tag: '#분위기 좋은 카페',
    title: '빽다방',
    image:
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
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
const hashContentsContext = createContext();

export function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initalHasTag);

  return (
    <hashTagStateContext.Provider value={state}>
      <hashTagDispatchContext.Provider value={dispatch}>
        <hashContentsContext.Provider value={hashContents}>{children}</hashContentsContext.Provider>
      </hashTagDispatchContext.Provider>
    </hashTagStateContext.Provider>
  );
}

export const useHashTagState = () => {
  return useContext(hashTagStateContext);
};

export const useHashTagDispatch = () => {
  return useContext(hashTagDispatchContext);
};

export const useHashContents = () => {
  return useContext(hashContentsContext);
};
