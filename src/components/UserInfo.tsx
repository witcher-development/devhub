import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { User } from '../types/User';
import { getUser } from '../client';

import { Button, LinearProgress } from '@material-ui/core';

import style from './UserInfo.module.scss';

const UserInfo: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const userResponse: User = await getUser(+id);
        setUser(userResponse);
      } catch (e) {
        alert('In get user info. ' + e);
        history.push('/');
      }
    };

    fetchUser();
  }, []);

  const goToEditPage = () => {
    history.push('/edit/' + id);
  };

  return (
    <div>
      {user ? (
        <div className={style.info}>
          <p>{user.last_name}</p>
          <div className={style.info__edit}>
            <Button variant="contained" color="primary" onClick={goToEditPage}>
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default UserInfo;
