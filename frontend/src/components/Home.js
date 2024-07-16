import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}}/blogposts/`)
      .then(response => {
        setBlogPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blog posts!', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-6 py-3">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <Link to={`/blogposts/${post.slug}`} key={post.slug} className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${post.image_url})` }}>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-gray-800 text-xl font-bold group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {post.description}
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
