import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Spinner } from "react-bootstrap";

import { fetchPostById } from "../../store/utils/thunks";
import { clearPostById } from "../../store/reducers/posts";
import Newsletter from "../utils/newsletter";
import { AppDispatch, RootState } from "../../store";

const PostComponent = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchPostById(params.id!));
  }, [dispatch, params.id]);

  useEffect(() => {
    return () => {
      dispatch(clearPostById());
    };
  }, [dispatch]);

  return (
    <>
      {posts.postById ? (
        <div className="article_container">
          <h1>{posts.postById.title}</h1>
          <div
            style={{
              background: `url(${posts.postById.imagexl})`,
            }}
            className="image"
          ></div>
          <div className="author">
            Created by: <span>{posts.postById.author} - </span>
            <Moment format="DD MMMM">{posts.postById.createdAt}</Moment>
          </div>
          <div className="mt-3 content">
            <div
              dangerouslySetInnerHTML={{
                __html: posts.postById.content,
              }}
            ></div>
          </div>
        </div>
      ) : null}

      {posts.loading ? (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
      <Newsletter />
    </>
  );
};

export default PostComponent;
