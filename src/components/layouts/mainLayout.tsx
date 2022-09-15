import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  return (
    <Container className="mt-5 mb-5">
      {props.children}
      <ToastContainer />
    </Container>
  );
};

export default MainLayout;
