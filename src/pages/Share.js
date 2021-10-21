import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import HashTagContents from '../components/HasTag/HashTagContents';

import '../styles/share.css';
import HashTagButton from '../components/HasTag/HashTagButton';

function Share({ userId }) {
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [coffeeHeartList, setCoffeeHeartList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('all');
  const [wow, setWow] = useState(true);
  const [hasData, setHasData] = useState(false);
  const observer = useRef();

  const coffeeItemSet = coffeeItem.map((v) => v.id_coffee_item);
  const heartCoffeItemSet = coffeeHeartList.map((v) => v.coffee_id);
  const heartCoffee = coffeeItemSet.filter((v) => heartCoffeItemSet.includes(v));

  useEffect(() => {
    axios.get(`/share/categories`).then(({ data }) => setCategories(data));
  }, []);

  const categoryHandler = (category) => {
    setParentCategory(category);
    setPages(0);
    setWow(false);
  };

  useEffect(() => {
    setIsLoading(true);

    axios.get(`/share/list/${pages}/${parentCategory}`).then(({ data }) => {
      console.log(data.length > 0);
      if (wow) {
        setCoffeeItem((prevItems) => {
          return [...new Set([...prevItems, ...data])];
        });
      } else {
        setCoffeeItem([]);
        setWow(true);
      }
      setHasData(data.length > 0);
      setIsLoading(false);
    });
  }, [pages, parentCategory, wow]);

  useEffect(() => {
    if (userId) {
      axios.get(`/share/list/heart/${userId}`).then(({ data }) => setCoffeeHeartList(data));
    }
  }, [userId, pages]);

  const moreObserver = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting && hasData) {
          setPages((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasData],
  );

  return (
    <div className="share-wrap">
      {categories.map((category) => (
        <HashTagButton
          category={category.coffee_category}
          categoryHandler={categoryHandler}
          parentCategory={parentCategory}
        />
      ))}
      <div className="share-contents-wrap">
        {coffeeItem.map((v) => {
          return (
            <HashTagContents
              data={v}
              isLoading={isLoading}
              setPages={setPages}
              moreObserver={moreObserver}
              userId={userId}
              on={heartCoffee}
            />
          );
        })}
      </div>
      {isLoading && (
        <div ref={moreObserver} className="loading">
          <div>{isLoading ? 'Loading...' : ''}</div>
        </div>
      )}
    </div>
  );
}

export default Share;
