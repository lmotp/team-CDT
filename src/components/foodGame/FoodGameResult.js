import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFoodGameResult } from '../../Context';
import Loading from '../../pages/Loading';
import NotFound from '../../pages/NotFound';
import '../../styles/foodGame.css';

function FoodGameResult() {
  const { count } = useParams();
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const result = useFoodGameResult();

  useEffect(() => {
    window.scrollTo(0, 0);
    let category;
    switch (Number(count)) {
      case 0:
        category = 'Coffee';
        break;
      case 1:
        category = 'Latte';
        break;
      case 2:
        category = 'Ccino';
        break;
      case 3:
        category = 'Sparkling';
        break;
      case 4:
        category = 'Fruit-drink';
        break;
      case 5:
        category = 'Tea';
        break;
      default:
        break;
    }

    axios.get(`/foodgame/${category}`).then(({ data }) => {
      setCoffeeItem(data);
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    });
  }, [count]);

  return (
    <div className="foodGame-result-wrap">
      {loading ? (
        <>
          {count <= result.length ? (
            <>
              <div className="foodGame-result-box">
                <img src={result[count].image} alt={result[count].drink} />
                <div className="result-info">
                  <h2>
                    {result[count].brand} - <span>{result[count].drink}</span>
                  </h2>
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
              <button>
                <Link to="/">가자홈으로</Link>
              </button>
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
