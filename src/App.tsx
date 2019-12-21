import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Template from './components/Template';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Template />
      </Router>
    </div>
  );
};

export default App;
