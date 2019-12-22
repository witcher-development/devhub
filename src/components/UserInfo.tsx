import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { User } from '../types/User';
import { getUser } from '../client';

import { Button, LinearProgress, Divider, Tooltip } from '@material-ui/core';

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
          <div className={style.info__header}>
            <h1>User info</h1>
            <Tooltip
              title={user.is_active ? 'Active' : 'Not active'}
              placement="top"
            >
              <div
                className={
                  user.is_active ? style.info__label_active : style.info__label
                }
              ></div>
            </Tooltip>
          </div>
          <Divider />
          <div className={style.info__section}>
            <h3>Name</h3>
            <p>{user.first_name + ' ' + user.last_name}</p>
          </div>
          <div className={style.info__section}>
            <h3>Birth date</h3>
            <p>{user.birth_date}</p>
          </div>
          <div className={style.info__section}>
            <h3>Gender</h3>
            <p>{user.gender}</p>
          </div>
          <div className={style.info__section}>
            <h3>Job</h3>
            <p>{user.job}</p>
          </div>
          <div className={style.info__section}>
            <h3>Biography</h3>
            <p>{user.biography}</p>
          </div>
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
