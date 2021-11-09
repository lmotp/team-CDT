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
      axios.get(`/api/share/heart/${userId}`).then(({ data }) => {
        setCoffeeHeartList(data);
      });
    }
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`/api/foodgame/${category}`).then(({ data }) => {
      setCoffeeItem(data);
      setTimeout(() => {
        setLoading(true);
      }, 500);
    });
  }, [category]);

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
                  <p>{result[count].tmi}</p>
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
