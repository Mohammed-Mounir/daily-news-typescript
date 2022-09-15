import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import Moment from "react-moment";
import { Button, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { fetchPosts } from "../../store/utils/thunks";
import { AppDispatch, RootState } from "../../store";

const HomePosts = () => {
  const homePosts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (homePosts.articles.items.length) return;

    dispatch(fetchPosts({ page: 1, limit: 6, order: "desc" }));
  }, [dispatch, homePosts]);

  const loadMorePosts = () => {
    dispatch(
      fetchPosts({ page: homePosts.articles.page + 1, limit: 6, order: "desc" })
    );
  };

  return (
    <>
      <Masonry
        breakpointCols={{ default: 3, 800: 2, 400: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {homePosts.articles
          ? homePosts.articles.items.map((item) => (
              <div key={item.id}>
                <img
                  src={`${item.image}?${item.id}`}
                  style={{ width: "100%", height: "200px" }}
                  alt="article"
                />
                <div className="author">
                  <span>{item.author} - </span>
                  <Moment format="DD MMMM">{item.createdAt}</Moment>
                </div>
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="excerpt">{item.excerpt}</div>
                  <LinkContainer to={`/article/${item.id}`} className="mt-3">
                    <Button variant="light">Read more</Button>
                  </LinkContainer>
                </div>
              </div>
            ))
          : null}
      </Masonry>
      {homePosts.loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
      {!homePosts.articles.end && !homePosts.loading ? (
        <Button variant="outline-dark" onClick={loadMorePosts}>
          Load more posts
        </Button>
      ) : null}
      {homePosts.articles.end && !homePosts.loading ? (
        <p style={{ textAlign: "center" }}>End of posts :(</p>
      ) : null}
    </>
  );
};

export default HomePosts;
