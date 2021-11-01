import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import HashTagContents from '../components/HasTag/HashTagContents';

import '../styles/share.css';
import HashTagButton from '../components/HasTag/HashTagButton';
import { useParams } from 'react-router';
import Loading from './Loading';

function Share({ userId }) {
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [coffeeHeartList, setCoffeeHeartList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryState, setCategoryState] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const observer = useRef();

  const coffeeItemSet = coffeeItem.map((v) => v.id_coffee_item);
  const heartCoffeItemSet = coffeeHeartList.map((v) => v.coffee_id);
  const heartCoffee = coffeeItemSet.filter((v) => heartCoffeItemSet.includes(v));

  useEffect(() => {
    setIsLoading(true);

    axios.get(`/share/list/${pages}/${category}`).then(({ data }) => {
      if (categoryState) {
        setCoffeeItem((prevItems) => {
          return [...new Set([...prevItems, ...data])];
        });
      }
      setHasData(data.length > 0);
      setIsLoading(false);
      setLoading(true);
      setCategoryState(false);
    });
  }, [pages, category, categoryState]);

  useEffect(() => {
    if (userId) {
      axios.get(`/share/heart/${userId}`).then(({ data }) => {
        setCoffeeHeartList(data);
      });
    }
  }, [userId, pages]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/share/categories`).then(({ data }) => {
      setCategories(data);
    });
  }, []);

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
          setCategoryState(true);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasData],
  );

  const pagesHandler = useCallback(() => {
    setPages(0);
    setCoffeeItem([]);
    setCategoryState(true);
    setLoading(false);
  }, [setPages]);

  return (
    <div className="share-wrap">
      {loading ? (
        <>
          <div className="button-box-category">
            {categories.map((childCategory) => (
              <HashTagButton
                childCategory={childCategory.coffee_category}
                category={category}
                pagesHandler={pagesHandler}
              />
            ))}
          </div>
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
            <div className="shard-loading-box">
              <Loading />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Share;
