import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import HashTagContents from '../components/HasTag/HashTagContents';

import '../styles/share.css';
import HashTagButton from '../components/HasTag/HashTagButton';
import { useParams } from 'react-router';
import Loading from './Loading';

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

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (!hasData) {
      return;
    }
    if (scrollTop + clientHeight === scrollHeight && isLoading) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setPages(pages + 1);
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

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
              return <HashTagContents data={v} userId={userId} on={heartCoffee} category={category} />;
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Share;
