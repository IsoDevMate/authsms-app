import { supabase } from './client';
import {  useEffect,useReducer } from 'react';
import './index.css';

const App = () => {
  const initialState = {
    posts: [],
    post: { title: '', content: '' }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_POSTS':
        return { ...state, posts: action.payload };
      case 'SET_POST':
        return { ...state, post: action.payload };
      case 'RESET_POST':
        return { ...state, post: { title: '', content: '' } };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { posts, post } = state;

  const fetchPosts = async () => {
    try {
      const { data } = await supabase.from('Posts').select('*');
      dispatch({ type: 'SET_POSTS', payload: data || [] });
      console.log('data',data)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTitleChange = (e) => {
    dispatch({ type: 'SET_POST', payload: { ...post, title: e.target.value } });
  };

  const handleContentChange = (e) => {
    dispatch({ type: 'SET_POST', payload: { ...post, content: e.target.value } });
  };

  const createPost = async () => {
    try {
      await supabase.from('Posts').upsert([post]);
      dispatch({ type: 'RESET_POST' });
      posts.push(post);
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
          onChange={handleTitleChange}
        />
        <input
          placeholder="Content"
          value={post.content}
          onChange={handleContentChange}
        />
        <button onClick={createPost}>Create Post</button>

        {posts.map((post) => (
          <div className="display" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

