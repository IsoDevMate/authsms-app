import { supabase } from './client';
import { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '' }); // Initialize post as an object

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await supabase.from('Posts').select('*'); // Use '*' to select all columns
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    try {
      await supabase.from('Posts').upsert([post]); // Use upsert to insert or update
      setPost({ title: '', content: '' });
      fetchPosts(); // Move this inside try block to ensure it gets called after a successful insert
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <div className="App">
        <input
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })} // Update post.title
        />
        <input
          placeholder="Content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })} // Update post.content
        />
        <button onClick={createPost}>Create Post</button>

        {posts.map((post) => (
          <div className="display" key={post.id}> {/* Use post.id instead of posts.id */}
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
