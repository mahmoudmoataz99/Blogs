import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddArticle = () => {
  const [formData, setFormData] = useState({ 
    title: '', 
    content: '', 
    author: '', 
    email: '', 
    category: '', 
    image: '' 
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://blogs-production-c007.up.railway.app/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Failed to load categories');
        setIsError(true);
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(
        'https://blogs-production-c007.up.railway.app/articles', 
        formData
      );

      setMessage('Article added successfully!');
      setIsError(false);
      setFormData({ 
        title: '', 
        content: '', 
        author: '', 
        email: '', 
        category: '', 
        image: '' 
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message ||
        error.message ||
        'Error adding article';
      setMessage(errorMsg);
      setIsError(true);
      console.error('Submission Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="max-w-lg mx-auto my-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Article</h1>

      {message && (
        <div 
          className={`text-center p-3 mb-4 rounded-lg ${
            isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className={`w-full p-2 border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            rows={10} 
            className={`w-full p-2 border ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
          />
          {errors.content && (
            <p id="content-error" className="text-red-500 text-sm mt-1">
              {errors.content}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="author" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            className={`w-full p-2 border ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <p id="author-error" className="text-red-500 text-sm mt-1">
              {errors.author}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={`w-full p-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className={`w-full p-2 border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.id} value={cat.Name || cat.name}>
                {cat.Name || cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="text-red-500 text-sm mt-1">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input 
            type="url" 
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Add Article'
          )}
        </button>
      </form>
    </section>
  );
};

export default AddArticle;