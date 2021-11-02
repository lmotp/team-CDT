import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import HashTagContents from '../components/HasTag/HashTagContents';

import '../styles/share.css';
import HashTagButton from '../components/HasTag/HashTagButton';
import { useParams } from 'react-router';
import Loading from './Loading';
import MoreCoffeeItem from '../components/HasTag/MoreCoffeeItem';

function Share({ userId }) {
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [coffeeHeartList, setCoffeeHeartList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const coffeeItemSet = coffeeItem.map((v) => v.id_coffee_item);
  const heartCoffeItemSet = coffeeHeartList.map((v) => v.coffee_id);
  const heartCoffee = coffeeItemSet.filter((v) => heartCoffeItemSet.includes(v));

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

  useEffect(() => {
    setIsLoading(false);
    const res = async () => {
      await axios.get(`/share/list/${pages}/${category}`).then(({ data }) => {
        setCoffeeItem((prevItems) => {
          return [...new Set([...prevItems, ...data])];
        });
        setHasData(data.length > 0);
      });
      setIsLoading(true);
      setLoading(true);
    };
    res();
  }, [pages, category]);

  const pagesHandler = useCallback(() => {
    setPages(0);
    setCoffeeItem([]);
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
              return <HashTagContents data={v} userId={userId} on={heartCoffee} />;
            })}
            <MoreCoffeeItem hasData={hasData} setPages={setPages} loading={isLoading} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Share;
