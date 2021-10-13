import React, { useState } from 'react';
import DetailCommentForm from './DetailCommentForm';
import '../../styles/detail.css';
import DetailPagination from './DetailPagination';

function DetailCommentSection({ comment, recomments, loadingHandler }) {
  const postPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastPost - postPerPage;
  const currentPosts = comment.slice(indexOfFistPost, indexOfLastPost);

  // Change Page
  const paginate = (pageNumber) => () => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {comment ? (
        <div className="comment-form-wrap">
          {currentPosts.map((comment) => (
            <>
              <DetailCommentForm
                key={comment.comment_id}
                id={comment.comment_id}
                createdAt={comment.createdAt}
                nickName={comment.nickname}
                profileImg={comment.img}
                heartCount="20"
                comment={comment.content}
                loadingHandler={loadingHandler}
              />
              {recomments
                .filter((recomment) => comment.comment_id === recomment.comment_id)
                .map((recomment) => (
                  <div>
                    <DetailCommentForm
                      key={recomment.comment_id}
                      id={recomment.comment_id}
                      createdAt={recomment.createdAt}
                      nickName={recomment.nickname}
                      profileImg={recomment.img}
                      heartCount="20"
                      comment={recomment.recomment}
                      on={true}
                    />
                  </div>
                ))}
            </>
          ))}

          <div className="pagiNation-wrap">
            <DetailPagination
              postsPerpage={postPerPage}
              totalPosts={comment.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DetailCommentSection;
