import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/blogposts/${slug}/`)
      .then(response => {
        setBlogPost(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blog post!', error);
      });
  }, [slug]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </div>
  );
}

export default BlogPost;
