import React, { createContext, useContext, useReducer, useState } from 'react';

const initalUpload = [];

const example = [
  {
    question: '오늘의 기분은 어떠신가요??????????????',
    answer: [
      { value: 'a. 목이 "와! 찹다"라고 느낄정도로 시원한 아메리카노', type: [2, 0, 4, 5] },
      { value: 'b. 오늘은 몸이 차가우니깐 따뜻하게 모카라떼', type: [1, 2, 3] },
      { value: 'c. 너무 오늘 우울행, 버그가 너무 많앙 상큼한 오렌지에이드', type: [5, 3, 1] },
      { value: 'd. 너무 신나는 이 텐션 유지하구싶어 완전홍시', type: [4, 0] },
    ],
  },
  {
    question: '아니 이거를 내가 무슨 재주로 만들지???',
    answer: [
      { value: 'a. 내 재주는 디자인인가?? 개발인가? 왜케 덥지?', type: [1, 2, 0] },
      { value: 'b. 오늘 짱 덥네, 그러게 말이다.', type: [3, 5] },
      { value: 'c. 아니 이 사람들 뭔가 수상한데, 이상해 이상해', type: [2, 4, 3, 5] },
      { value: 'd. 뭔가 덥고 이상하네 이거를 또 만들어야하네', type: [1, 4] },
    ],
  },
  {
    question: '질문을 뭘로 해야하지??',
    answer: [
      { value: 'a. 질문질문이 어려움', type: [1, 0, 2, 3] },
      { value: 'b. 흠 이걸 에프파이브하면은 인식해줘야하나?', type: [2, 5, 4, 1] },
      { value: 'c. 오늘따라 그 소녀가 왜이렇게 보고싶을까?', type: [4, 3] },
      { value: 'd. 비에 젖은 단발머리 그 소녀', type: [2, 5, 0] },
    ],
  },
  {
    question: '나중에 질문은 천처히 고치자',
    answer: [
      { value: 'a. 이걸언제 다시 다 고치냐?', type: [3, 2, 5] },
      { value: 'b. 그냥 대충 만들고 나중에 다시 고치자', type: [5, 0, 4, 1] },
      { value: 'c. 뭐 대충 만들어 대충대충', type: [1, 5, 2] },
      { value: 'd. 지금은 그럴단계야', type: [4, 3, 0] },
    ],
  },
  {
    question: '문별이의 솔로곡 중 아닌것은?',
    answer: [
      { value: 'a. 달달 빛나는 반짝이는 달', type: [5, 0, 4] },
      { value: 'b. 달이 태양을 가릴때는 이클립스', type: [2, 1] },
      { value: 'c. 자유로운 삶을 위해서 셀피쉬', type: [3, 5, 4] },
      { value: 'd. 눈이 오네요 벌써 12월인가봅니다 눈', type: [2, 1, 0] },
    ],
  },
  {
    question: '마마무 노래가 아닌것은 무엇일까요?',
    answer: [
      { value: 'a. 너와 나 똑닮은 데칼? 코마니!', type: [5, 2, 1, 3] },
      { value: 'b. 부장님은 아재개그를 좋아하시지 왜냐고? 부장이니깐', type: [2, 4, 0] },
      { value: 'c. 별이 빛나는 밤은 언제일까? 후 어렵구만', type: [1, 0, 5] },
      { value: 'd. 어린시절이 그리운 그날 피터팬처럼', type: [1, 4, 3] },
    ],
  },
  {
    question: '이거를 몇번째 반복해야하는거여',
    answer: [
      { value: 'a. 근데 이거를 돈받고 이걸 의뢰하나?', type: [0, 1, 5] },
      { value: 'b. 더 어렵게 만들었으니깐 의로를하겠찌?', type: [3, 4, 5] },
      { value: 'c. 메스맥스랑 메스민을 쓰면은 가능하지않을까?', type: [4, 2] },
      { value: 'd. 아유 개발자가 힘들구만 힘들구마잉', type: [1, 0, 2] },
    ],
  },
];

const result = [
  {
    drink: '아메리카노',
    category: 'Coffee',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_201905220142317090.png',
    tmi: `가장 기초가 되는 맛은 쓴맛. 물론 다양한 기호에 맞게 각국의 커피 맛이 어느 정도는 다르거니와 신맛을 포함해서 
입 안에서 느껴지는 다른 맛과 향도 커피 평가에서 중요하지만, 커피에게 쓴맛은 거의 기본이나 다름없다. 
커피가 인간이 매우 매우 사랑하는 음료로 간단하게 입가심이 필요하실때는, 커피한잔의 여유`,
  },
  {
    drink: '카페라떼',
    category: 'Latte',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_201905220139212410.png',
    tmi: `이탈리아어로 우유를 뜻하는 단어지만 스타벅스의 성공 이후 라떼=카페라테의 의미로 널리 쓰이게 되었다. 
국내에서는 흔히 음료 이름에 '라떼'가 붙어 있으면 대부분 커피(에스프레소)가 포함된 음료이다. 
유럽권 국가에서 ‘라떼’를 주문하면 관광객의 표현에 익숙한 점원이거나 스타벅스가 널리 퍼진 국가가 아닌 이상 
우유를 받게될 수 있으니 조심하자 하지만 우리는 국내기 때문에 상괸이 없다. 
커피는 쓰고 우유는 너무 달짝지근할때 그 중간 맛이 생각나면은 라떼란 말이야!`,
  },
  {
    drink: '콜드브루 할리치노',
    category: 'Ccino',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_201706161031192200.png',
    tmi: `각종 재료를 얼음과 같이 갈아서 만드는 음료로 여러 재료를 사용하여 색상을 이용한 플레이팅도 가능해, 
맛도 맛이지만 눈으로 봐도 이쁘다. 다양한 브랜드에서 브랜드의 이름을 걸고 치노를 만드는 경우도 종종 볼 수 있다. 그리고 각종 재료를 사용하기 때문에 재료에 제한이 없어 이벤트성 메뉴로도 많이 보인다.
새로운 맛에 도전 해 보고싶으시면은 한번 치노도 어떠신지?`,
  },
  {
    drink: '복숭아 자두 스파클링',
    category: 'Sparkling',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_201805310537345500.png',
    tmi: `스파클링이란? 거품이 일어난다는 의미, 기존의 탄산음료와 다르게 청량감을 유지하면서도 단맛을 최소화해 
자극적이지 않은 음료를 선호하는 사람들에게 좋은 반응을 얻고 있다.
그러니 오늘같이 답답한 날 속을 뻥 뚫어줄 음료!! 스파클링은 어떠신가요??`,
  },
  {
    drink: '사과 비트 착즙 주스',
    category: 'FruitDrink',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_202104300915048730.png',
    tmi: `현대사회에 이르러 많은 현대인들이 각종 비타민 부족으로 몸에 지병을 앓고 있지만, 
약으로도 가능하지만 맛도 좋은 과일주스를 통해 비타민을 얻을 수 있다.
오늘은 카페인이나 고당도 음료보다는 내 몸을 위해 각종 비타민과 영양분이 들어가 있는 주스는 어떤가요??`,
  },
  {
    drink: '유자 캐모마일',
    category: 'Tea',
    image: 'https://admin.hollys.co.kr/upload/menu/etc/menuEtc_201910240241538460.png',
    tmi: `차는 차나무 잎을 비롯한 식물성 재료를 우려 만드는 음료이다. 카페인, 카테킨, 테아닌 등이 다량 함유되어 있고,
테아닌에 심신안정 효과가 있어, 안정이 필요한 사람들이 많이 찾는 한편, 카페인이 강한 찻잎을 모아 
브렉퍼스트 티처럼 이른 아침에 잠을 깨는 용도로도 마신다. 차에는 카테킨 성분이 있어 카페인이 체내 흡수되는 것을 줄여주기 때문에 커피보다는 카페인의 부작용에서 자유롭다. 카테킨은 폴리페놀이라고도 불리는데,
이 폴리페놀은 신체 전반의 건강 및 혈관, 피부 등에 도움을 준다. 안정과 건강을 위한 차는 어떤가요?`,
  },
];

function uploadReducer(state, action) {
  switch (action.type) {
    case 'HASHTAG_ADD':
      return [...state, { id: action.id, value: action.value }];
    case 'HASHTAG_DELTE':
      return state.filter((hashTag) => hashTag.id !== action.id);
    case 'ALL_DELTE':
      return [];
    default:
      throw new Error('액션타입이 빔 맞았습니다!!!!');
  }
}

const hashContentsContext = createContext();
const foodGameExampleContext = createContext();
const foodGameResultContext = createContext();
const uploadDispatchContext = createContext();
const uploadStateContext = createContext();
const orderBoxContext = createContext();

export function Context({ children }) {
  const [uploadState, uploadDispatch] = useReducer(uploadReducer, initalUpload);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const orderBox = {
    order,
    setOrder,
    loading,
    setLoading,
  };

  return (
    <orderBoxContext.Provider value={orderBox}>
      <uploadDispatchContext.Provider value={uploadDispatch}>
        <uploadStateContext.Provider value={uploadState}>
          <foodGameExampleContext.Provider value={example}>
            <foodGameResultContext.Provider value={result}>{children}</foodGameResultContext.Provider>
          </foodGameExampleContext.Provider>
        </uploadStateContext.Provider>
      </uploadDispatchContext.Provider>
    </orderBoxContext.Provider>
  );
}

export const useHashContents = () => {
  return useContext(hashContentsContext);
};

export const useFoodGameExample = () => {
  return useContext(foodGameExampleContext);
};

export const useFoodGameResult = () => {
  return useContext(foodGameResultContext);
};

export const useUploadState = () => {
  return useContext(uploadStateContext);
};

export const useUploadDispatch = () => {
  return useContext(uploadDispatchContext);
};

export const useOrderBox = () => {
  return useContext(orderBoxContext);
};
