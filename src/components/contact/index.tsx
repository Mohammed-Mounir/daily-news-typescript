import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/utils/thunks";
import { showToast } from "../utils/tools";
import { AppDispatch } from "../../store";

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: { email: "", firstname: "", lastname: "", message: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter your email address")
        .email("Invalid email"),
      firstname: Yup.string().required("Please enter your first name"),
      lastname: Yup.string().required("Please enter your last name"),
      message: Yup.string()
        .required("Please enter your message")
        .max(500, "Message is too long"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
        .unwrap()
        .then((response) => {
          if (response) {
            resetForm();
            showToast("SUCCESS", "Thank you, We will contact you soon.");
          }
        })
        .catch((error) => {
          showToast("ERROR", "Something went wrong, try again later.");
        });
    },
  });

  return (
    <>
      <h1>Contact Us</h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="firstname">First Name</label>
          <input
            type="firstname"
            className="form-control"
            placeholder="John"
            {...formik.getFieldProps("firstname")}
          />
          {formik.errors.firstname && formik.touched.firstname ? (
            <Alert variant="danger">{formik.errors.firstname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="lastname"
            className="form-control"
            placeholder="Doe"
            {...formik.getFieldProps("lastname")}
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <Alert variant="danger">{formik.errors.lastname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="message">Message</label>
          <textarea
            rows={3}
            className="form-control"
            {...formik.getFieldProps("message")}
          />
          {formik.errors.message && formik.touched.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Send message
        </button>
      </form>
    </>
  );
};

export default Contact;
