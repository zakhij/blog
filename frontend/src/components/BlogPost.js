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
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="mb-2">
            <p className="text-gray-800 font-semibold" style={{ marginBottom: '0px' }}>{comment.author}</p>
            <p className="text-gray-600 text-xs">
              {new Date(comment.created_at).toLocaleString('en-GB', {
                timeZone: 'America/Los_Angeles',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} PST
            </p>
            <p className="text-gray-700">{comment.content}</p>
            <hr className="mt-2 mb-2 border-gray-300" />
          </div>
        ))}

        <h2 className="text-2xl font-bold mb-4" style={{ marginTop: '20px' }}>Share Your Thoughts!</h2>
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
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Post Comment
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default BlogPost;
