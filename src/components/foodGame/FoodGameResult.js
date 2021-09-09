import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFoodGameResult } from '../../Context';
import '../../styles/foodGame.css';

function FoodGameResult() {
  const { count } = useParams();
  const result = useFoodGameResult();
  console.log(result[count]);

  return (
    <div className="foodGame-wrap">
      <img src={result[count].image} alt={result[count].drink} />
      <div>
        <h2>
          {result[count].brand} &nbsp;
          <span>{result[count].drink}</span>
        </h2>
      </div>
      <p> {result[count].tmi}</p>
      <button>
        <Link to="/">가자홈으로</Link>
      </button>
    </div>
  );
}

export default FoodGameResult;
