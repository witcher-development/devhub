import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { User } from '../types/User';
import { getUsers, removeUser as removeUserRequest } from '../client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import style from './UsersList.module.scss';

const UsersList: React.FC = () => {
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const users: User[] = await getUsers();
      console.log(users);
      setUsers(users);
    } catch (e) {
      alert('In get users list. ' + e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const goToEditPage = () => {
    history.push('/edit');
  };

  const removeUser = async (id: number) => {
    await removeUserRequest(id);
    await fetchUsers();
  };

  return (
    <div className={style.table}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, first_name, last_name, gender, birth_date }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Link
                    to={'user/' + id}
                    key={id}
                    className={style.table__link}
                  >
                    {first_name} {last_name}
                  </Link>
                </TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{birth_date}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeUser(id)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={style.button_wrap}>
        <Button variant="contained" color="primary" onClick={goToEditPage}>
          Add new
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
