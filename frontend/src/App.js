import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BlogPost from './components/BlogPost';
import NavBar from './components/NavBar';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> 
        <div className="pt-12">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/blogposts/:slug" element={<BlogPost />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;