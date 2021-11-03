import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useFoodGameExample } from '../../Context';
import '../../styles/foodGame.css';
function FoodGame() {
  const foodGameExample = useFoodGameExample();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [array, setArray] = useState(
    Array(7)
      .fill(0)
      .map((v) => v),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const countPlus = (e) => {
    window.scrollTo(0, 0);
    const id = e.target.id;
    const target = foodGameExample[count].answer[id].type;

    for (let i = 0; i < target.length; i++) {
      array[target[i]] += 1;
    }

    if (count === 6) {
      const result = array.indexOf(Math.max(...array));

      let category;
      switch (Number(result)) {
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
          category = 'FruitDrink';
          break;
        case 5:
          category = 'Tea';
          break;
        default:
          break;
      }

      history.push(`/foodgame/${category}`);
      setArray(
        Array(7)
          .fill(0)
          .map((v) => v),
      );

      return;
    }
    setCount(count + 1);
  };

  return (
    <div className="foodGame-wrap">
      <h1>{foodGameExample[count].question}</h1>
      <div className="foodGame-button-wrap">
        {foodGameExample[count].answer.map((answer, index) => (
          <button className="foodGameButton" id={index} key={index} onClick={countPlus}>
            {answer.value}
          </button>
        ))}
      </div>
      <div>{count + 1} / 7</div>
    </div>
  );
}

export default FoodGame;
