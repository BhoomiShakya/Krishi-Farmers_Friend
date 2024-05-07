import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import BlogInfo from "./pages/Blog_info";
import Home from "./pages/Home/Home";
import CropAssessmentForm from "./pages/Home/CropAssessmentForm"
import TodoApp from "./pages/Home/Schedule/TodoApp"
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-blog/:id" element={<BlogInfo/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/crop-assessment" element={<CropAssessmentForm/>}></Route>
        <Route path="/schedule" element={<TodoApp/>}></Route>
      </Routes>
    </>
  );
}

export default App;
