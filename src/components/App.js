import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import KeyValueStore from './KeyValueStore';
import '../styles/App.css';

function App() {
  return (
    <Router>
      <div id="main">
        <nav>
          <Link to="/">Reset</Link>
        </nav>
        <Routes>
          <Route path="/" element={<KeyValueStore />} />
          <Route path="/:key1/:value1/:key2?/:value2?" element={<KeyValueStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
