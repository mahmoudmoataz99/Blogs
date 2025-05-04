import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import HomePage from './pages/HomePage';
import MainLayout from './MainLayout';
import ArticleDetailPage from './pages/ArticleDetails';
import AllArticles from './pages/All Articles';
import AddArticle from './pages/NewArticle';

const App = () => {
  return (
     <Router>       
          <Routes>         
            <Route path="/" element={<MainLayout />}>           
              <Route index element={<HomePage />} />               
              <Route path="/newarticle" element={<AddArticle />} /> 
              <Route path="/allarticles" element={<AllArticles />} /> 
              <Route path="article/:id" element={<ArticleDetailPage />} /> 
            </Route>       
          </Routes>     
        </Router>   
  );
};

export default App;
