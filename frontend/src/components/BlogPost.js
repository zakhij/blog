import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogposts/${slug}/`)
      .then(response => {
        setBlogPost(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blog post!', error);
      });
  }, [slug]);

  if (!blogPost) {
    return <div className="text-center mt-10">Blog not found. </div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-6 -mt-20">
        <div className="h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md" style={{ backgroundImage: `url(${blogPost.image_url})` }}>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      <p className="text-gray-600 text-sm mb-8">{new Date(blogPost.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}</p>
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
    </div>
  );
}

export default BlogPost;
