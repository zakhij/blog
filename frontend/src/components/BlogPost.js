import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import PageLayout from './PageLayout';

function BlogPost() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogposts/${slug}/`)
      .then(response => {
        setBlogPost(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blog post!', error);
      });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blogposts/${slug}/comments/`)
      .then(response => {
        setComments(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the comments!', error);
    });
  }, [slug]);


  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...newComment,
      blog_post: blogPost.id, 
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/blogposts/${slug}/comments/`, payload)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment({ author: '', content: '' });
      })
      .catch(error => {
        console.error('There was an error posting the comment!', error);
      });
  };



  if (!blogPost) {
    return <div className="text-center mt-10">Blog not found. </div>;
  }

  return (
    <PageLayout>
      <div className="mb-6">
        <div
          className="h-64 md:h-96 bg-cover bg-center rounded-lg shadow-md"
          style={{ backgroundImage: `url(${blogPost.image_url})` }}
        ></div>
      </div>
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      <p className="text-gray-600 text-sm mb-8">
        {new Date(blogPost.created_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>
      <Markdown>{blogPost.content}</Markdown>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Share Your Thoughts!</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="author"
              value={newComment.author}
              onChange={handleCommentChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              name="content"
              value={newComment.content}
              onChange={handleCommentChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post Comment
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="mb-4">
            <p className="text-gray-800 font-semibold">{comment.author}</p>
            <p className="text-gray-600 text-sm">{new Date(comment.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</p>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default BlogPost;
