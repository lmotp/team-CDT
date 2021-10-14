import React, { useState } from 'react';
import DetailCommentForm from './DetailCommentForm';
import '../../styles/detail.css';
import DetailPagination from './DetailPagination';

function DetailCommentSection({ comment, recomments, loadingHandler, userId }) {
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
                name={comment.name}
                profileImg={comment.profileImg}
                heartCount="20"
                comment={comment.content}
                loadingHandler={loadingHandler}
                userId={userId}
                authId={comment.auth_id}
              />
              {recomments
                .filter((recomment) => comment.comment_id === recomment.comment_id)
                .map((recomment) => (
                  <div>
                    <DetailCommentForm
                      key={recomment.comment_id}
                      id={recomment.comment_id}
                      recommentId={recomment.id}
                      createdAt={recomment.createdAt}
                      name={recomment.name}
                      profileImg={recomment.profileImg}
                      heartCount="20"
                      comment={recomment.recomment}
                      userId={userId}
                      authId={recomment.auth_id}
                      loadingHandler={loadingHandler}
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
