import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import HashTagContents from '../components/HasTag/HashTagContents';

import '../styles/share.css';

function Share({ userId }) {
  const [coffeeItem, setCoffeeItem] = useState([]);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/share/list/${pages}`).then(
      ({ data }) =>
        setCoffeeItem((prevItems) => {
          return [...new Set([...prevItems, ...data])];
        }),
      setIsLoading(false),
    );
  }, [pages]);

  const moreObserver = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          setPages((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
        console.log(node);
      }
    },
    [isLoading],
  );

  return (
    <div className="share-wrap">
      <div className="share-contents-wrap">
        {coffeeItem.map((v) => {
          return <HashTagContents data={v} isLoading={isLoading} setPages={setPages} moreObserver={moreObserver} />;
        })}
      </div>
    </div>
  );
}

export default Share;
