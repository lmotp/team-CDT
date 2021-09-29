import React from 'react';

const DetailPagination = ({ postsPerpage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.map((number) => (
        <button className={number === currentPage ? 'active' : 'none'} key={number} onClick={paginate(number)}>
          {number}
        </button>
      ))}
    </>
  );
};

export default DetailPagination;
