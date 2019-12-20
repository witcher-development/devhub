import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../types/User';
import { getUsers } from '../client';

import style from './UsersList.module.scss';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users: User[] = await getUsers();
        console.log(users);
        setUsers(users);
      } catch (e) {
        alert('In get users list. ' + e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <ul className={style.list}>
        {users.map(({ id, first_name }) => (
          <li key={id} className={style.list__item}>
            <Link to={'user/' + id}>
              <p>{id}</p>
              <p>{first_name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
