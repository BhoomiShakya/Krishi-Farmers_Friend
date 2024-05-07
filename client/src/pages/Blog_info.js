// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

// Define BlogInfo component
const BlogInfo = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      const getBlogDetails = async () => {
        try {
          const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
          if (data?.success) {
            setBlog(data.blog);

          }
        } catch (error) {
          console.log(error);
        }
      };
  
      getBlogDetails();
    }, [id]);
  

  return (
    <div>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <img src={blog.image} alt={blog.title} />
          <p>Posted by: {blog.user.username}</p>
          <p>Posted at: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BlogInfo;
