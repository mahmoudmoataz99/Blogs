import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  title: '',
  content: '',
  author: '',
  email: '',
  category: '',
  image: '',
  message: '',
  isError: false,
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return { ...state, [action.field]: action.value };
    case 'SET_MESSAGE':
      return { ...state, message: action.message, isError: action.isError };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const AddArticle = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [categories, setCategories] = useState([]);
  const { title, content, author, email, category, image, message, isError } = state;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://blogs-production-c007.up.railway.app/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD_VALUE', field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      content,
      author,
      email,
      category,
      image,
    };

    try {
      await axios.post('https://blogs-production-c007.up.railway.app/articles', { body: newArticle });
      dispatch({ type: 'SET_MESSAGE', message: 'Article added successfully!', isError: false });
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error adding article';
      dispatch({ type: 'SET_MESSAGE', message: errorMsg, isError: true });
      console.error('Submission Error:', error.response || error.message);
    }
  };

  return (
    <section className="max-w-lg mx-auto my-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Add New Article</h1>

      {message && (
        <div className={`text-center p-2 mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <textarea id="content" name="content" value={content}
            onChange={handleInputChange} rows={10} className="w-full p-2 border border-gray-300 rounded" required></textarea>
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700">Author</label>
          <input
            type="text" id="author" name="author" value={author} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded"
            required />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <select id="category" name="category" value={category} onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded" required>
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.Name}>
                {cat.Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700">Image URL (Optional)</label>
          <input type="text" id="image" name="image" value={image} onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Article
        </button>
      </form>
    </section>
  );
};

export default AddArticle;
