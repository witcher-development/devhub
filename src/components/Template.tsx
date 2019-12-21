import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import UsersList from './UsersList';
import UserInfo from './UserInfo';
import UserEditOrCreate from './UserEditOrCreate';

import style from './Template.module.scss';

const App: React.FC = () => {
  const isHomePage = useRouteMatch('/');
  const history = useHistory();

  const goToHomePage = () => {
  	history.push('/');
	};

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {!isHomePage?.isExact && (
            <IconButton onClick={goToHomePage}>
              <ArrowBack style={{ color: '#fff' }} />
            </IconButton>
          )}
          <Typography variant="h6">Admin panel</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={style.container}>
        <Switch>
          <Route path="/edit/:id?">
            <UserEditOrCreate />
          </Route>
          <Route path="/user/:id">
            <UserInfo />
          </Route>
          <Route path="/">
            <UsersList />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
