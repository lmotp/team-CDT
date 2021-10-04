import React, { useState } from 'react';
import { useCommentState } from '../../Context';
import DetailCommentForm from './DetailCommentForm';
import '../../styles/detail.css';
import DetailPagination from './DetailPagination';

function DetailCommentSection({ date }) {
  const commentState = useCommentState();
  const postPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastPost - postPerPage;
  const currentPosts = commentState.slice(indexOfFistPost, indexOfLastPost);

  // Change Page
  const paginate = (pageNumber) => () => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="comment-form-wrap">
      {currentPosts.map((comment) => (
        <DetailCommentForm
          key={comment.id}
          id={comment.id}
          date={date}
          nickName={comment.nickName}
          profileImg={comment.profileImg}
          heartCount={comment.heartCount}
          comment={comment.comment}
        />
      ))}

      <div className="pagiNation-wrap">
        <DetailPagination
          postsPerpage={postPerPage}
          totalPosts={commentState.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default DetailCommentSection;
