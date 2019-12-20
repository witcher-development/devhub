import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { User } from '../types/User';
import { getUser } from '../client';

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

  return <div>{user ? <p>{user.last_name}</p> : <p>loading</p>}</div>;
};

export default UserInfo;
