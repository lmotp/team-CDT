import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFoodGameResult } from '../../Context';
import Loading from '../../pages/Loading';
import NotFound from '../../pages/NotFound';
import HashTagContents from '../HasTag/HashTagContents';
import '../../styles/foodGame.css';
import Footer from '../notice-contents/Footer';

function FoodGameResult({ userId }) {
  const { category } = useParams();
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [coffeeHeartList, setCoffeeHeartList] = useState([]);
  const [loading, setLoading] = useState(false);

  const result = useFoodGameResult();

  const count = result.map((v) => v.category).indexOf(category);

  const coffeeItemSet = coffeeItem.map((v) => v.id_coffee_item);
  const heartCoffeItemSet = coffeeHeartList.map((v) => v.coffee_id);
  const heartCoffee = coffeeItemSet.filter((v) => heartCoffeItemSet.includes(v));

  useEffect(() => {
    if (userId) {
      axios.get(`/share/heart/${userId}`).then(({ data }) => {
        setCoffeeHeartList(data);
      });
    }
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`/foodgame/${category}`).then(({ data }) => {
      setCoffeeItem(data);
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    });
  }, [category]);

  console.log(count);

  return (
    <div className="foodGame-result-wrap">
      {loading ? (
        <>
          {count >= 0 ? (
            <>
              <div className="foodGame-result-box">
                <img src={result[count].image} alt={result[count].drink} />
                <div className="result-info">
                  <h2>{result[count].category}</h2>
                  <h3>{result[count].drink}</h3>
                  <p>
                    싹이 인간은 동력은 고행을 곳이 있을 든 인간이 기관과 끓는다. 있을 무엇을 품고 것이다. 인류의 가지에
                    같은 뜨거운지라, 얼마나 사라지지 반짝이는 위하여서, 것이다. 있으며, 이 모래뿐일 우리 무엇을 봄날의
                    뜨거운지라, 방황하여도, 사막이다. 두손을 설레는 그림자는 트고, 것이다. 동력은 따뜻한 가는 이것이다.
                    장식하는 사라지지 가는 온갖 심장의 사막이다. 고동을 품었기 인류의 그러므로 할지라도 얼음이 든 우리
                    얼음에 보라. 뛰노는 수 뼈 밥을 원대하고, 동력은 영락과 그들의 풍부하게 철환하였는가? 기쁘며,
                    소담스러운 튼튼하며, 가슴이 청춘에서만 것이다.
                  </p>
                </div>
              </div>
              <div className="foodGame-contents-wrap">
                {coffeeItem.map((v) => {
                  return <HashTagContents data={v} userId={userId} on={heartCoffee} />;
                })}
              </div>
              <div className="result-button-box">
                <button>
                  <Link to="/foodgame">다시하기</Link>
                </button>
                <button>
                  <Link to={`/notice/recommend/${category}`}>다른 음료도</Link>
                </button>
              </div>
              <Footer />
            </>
          ) : (
            <NotFound />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default FoodGameResult;
