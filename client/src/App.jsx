import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AllArticles from './pages/All Articles';
import ArticleDetailPage from './pages/ArticleDetails';
import AddArticle from './pages/NewArticle';

import MainLayout from './MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/newarticle", element: <AddArticle /> },
      { path: "/allarticles", element: <AllArticles /> },
      { path: "/article/:id", element: <ArticleDetailPage /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;