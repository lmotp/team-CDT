import React from 'react';
import DetailCommentForm from './DetailCommentForm';
import '../../styles/detail.css';
import DetailPagination from './DetailPagination';

function DetailCommentSection({
  comment,
  recomments,
  loadingHandler,
  userId,
  scorllHight,
  currentPage,
  setCurrentPage,
}) {
  const postPerPage = 5;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFistPost = indexOfLastPost - postPerPage;
  const currentPosts = comment.slice(indexOfFistPost, indexOfLastPost);

  // Change Page
  const paginate = (pageNumber) => () => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, scorllHight);
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
