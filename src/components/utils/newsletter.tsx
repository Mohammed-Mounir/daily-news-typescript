import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addToNewsLetter } from "../../store/utils/thunks";
import { showToast } from "./tools";
import { clearNewsLetter } from "../../store/reducers/users";
import { AppDispatch } from "../../store";

const Newsletter = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let value = "";

    if (textInput.current) {
      value = textInput.current.value;
    }

    dispatch(addToNewsLetter({ email: value }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === "added") {
          showToast("SUCCESS", "You have been add to the list!");
        } else if (response.newsletter === "failed") {
          showToast("ERROR", "You are already on the list!");
        } else {
          showToast("ERROR", "Something went wrong!");
        }
        if (textInput.current) {
          textInput.current.value = "";
        }
        dispatch(clearNewsLetter());
      });
  };

  return (
    <div className="newsletter_container">
      <h1>Join our newsletter</h1>
      <div className="form">
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="EXAMPLE: youremail@gmail.com"
              name="email"
              ref={textInput}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Add me to the list
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Newsletter;
