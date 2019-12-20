import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UsersList from './components/UsersList';
import UserInfo from './components/UserInfo';
import UserEditOrCreate from './components/UserEditOrCreate';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <div>
          <Switch>
            <Route path="/edit">
              <UserEditOrCreate />
            </Route>
            <Route path="/user/:id">
              <UserInfo />
            </Route>
            <Route path="/">
              <UsersList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
