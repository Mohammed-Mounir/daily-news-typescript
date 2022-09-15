import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import PostsComponent from "./components/posts";
import Contact from "./components/contact";
import Header from "./components/header";
import MainLayout from "./components/layouts/mainLayout";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="article/:id" element={<PostsComponent />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default Router;
