import React, { useEffect, useRef } from 'react';
import Loading from '../../pages/Loading';

function MoreCoffeeItem({ setPages, hasData, loading }) {
  const moreCoffeeRef = useRef(null);
  const moreCoffeeObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting && hasData) {
      setPages((pages) => pages + 1);
      return;
    }
  });

  useEffect(() => {
    const moreCoffee = moreCoffeeRef.current;
    moreCoffeeObserver.observe(moreCoffee);
    return () => {
      moreCoffeeObserver.unobserve(moreCoffee);
    };
  }, []);

  console.log(loading);

  return (
    <div className="shard-loading-box" ref={moreCoffeeRef}>
      {loading && <Loading />}
    </div>
  );
}

export default MoreCoffeeItem;
