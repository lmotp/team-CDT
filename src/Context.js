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
  {
    id: 3,
    tag: '#프랜차이즈',
    title: '이디야',
    image: 'https://images.pexels.com/photos/2506993/pexels-photo-2506993.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
  },
];

const example = [
  {
    question: '1. 오늘의 기분은 어떠신가요??????????????',
    answer: [
      { value: 'a. 목이 "와! 찹다"라고 느낄정도로 시원한 아메리카노', type: [3, 0, 4, 5] },
      { value: 'b. 오늘은 몸이 차가우니깐 따뜻하게 모카라떼', type: [1, 2, 3] },
      { value: 'c. 너무 오늘 우울행, 버그가 너무 많앙 상큼한 오렌지에이드', type: [5, 3, 1] },
      { value: 'd. 너무 신나는 이 텐션 유지하구싶어 완전홍시', type: [5, 6] },
    ],
  },
  {
    question: '2. 아니 이거를 내가 무슨 재주로 만들지???',
    answer: [
      { value: 'a. 내 재주는 디자인인가?? 개발인가? 왜케 덥지?', type: [1, 3, 0] },
      { value: 'b. 오늘 짱 덥네, 그러게 말이다.', type: [3, 6] },
      { value: 'c. 아니 이 사람들 뭔가 수상한데, 이상해 이상해', type: [2, 6, 3, 5] },
      { value: 'd. 뭔가 덥고 이상하네 이거를 또 만들어야하네', type: [1, 5] },
    ],
  },
  {
    question: '3. 질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [1, 6, 2, 3] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [2, 5, 3, 1] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [5, 3] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [2, 5, 0] },
    ],
  },
  {
    question: '4. 질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [3, 2, 5] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [5, 0, 4, 1] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [6, 5, 2] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [4, 2] },
    ],
  },
  {
    question: '5. 질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [5, 0, 6] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [2, 1] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [3, 5, 6] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [2, 1, 6] },
    ],
  },
  {
    question: '6. 질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [5, 2, 1, 3] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [2, 4, 5] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [1, 6, 5] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [5, 4, 3] },
    ],
  },
  {
    question: '7. 질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [2, 1, 5] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [3, 4, 5] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [4, 2] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [6, 0, 2] },
    ],
  },
];

const result = [
  {
    brand: '스타벅스',
    drink: '자몽허니블랙티',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '자몽허니블랙티를 고른 당신? 너무 날씨가 춥군요',
  },
  {
    brand: '빽다방',
    drink: '완전홍시',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '완전 홍시가 나오다니 벌써 가을이네요옹?',
  },
  {
    brand: '메가커피',
    drink: '헤이즐넛아메리카노',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '헤이즐넛아메리카노는 달콤쌉사름함을 즐길 줄 아는 진정한 어른이시군요',
  },
  {
    brand: '메가커피',
    drink: '민트프라페',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '치약을 음료에서까지 찾는 당신 상당히 치아 건강에 신경을 두고있네요',
  },
  {
    brand: '컴포즈',
    drink: '헤이즐러넛라떼',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '라떼를 찾은 당신 상당히 꼰대끼가 있으시군요. 혹시 주변에서 꼰대냐고 수군수군대지 않나 확인해보세요',
  },
  {
    brand: '공차',
    drink: '망고',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '남미의 열정같이 뜨거운 당신과 정말 잘 어울리는 음료에요',
  },
  {
    brand: '코카콜라',
    drink: '체리콕',
    image: 'https://image.istarbucks.co.kr/skuImg/[9200000000190]_20210419131722970.jpg',
    tmi: '어린이입맛이네요. 그냥 편의점가서 음료 사드세요.',
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
const foodGameExampleContext = createContext();
const foodGameResultContext = createContext();

export function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initalHasTag);

  return (
    <hashTagStateContext.Provider value={state}>
      <hashTagDispatchContext.Provider value={dispatch}>
        <hashContentsContext.Provider value={hashContents}>
          <foodGameExampleContext.Provider value={example}>
            <foodGameResultContext.Provider value={result}>{children}</foodGameResultContext.Provider>
          </foodGameExampleContext.Provider>
        </hashContentsContext.Provider>
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

export const useFoodGameExample = () => {
  return useContext(foodGameExampleContext);
};

export const useFoodGameResult = () => {
  return useContext(foodGameResultContext);
};
